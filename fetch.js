// fetch.js — scarica TUTTE le aziende e crea un file JSON per ciascuna

import fs from "node:fs/promises";

// Variabili d'ambiente
const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID || "674d7153240404723fc12f5a"; // ID: Welo Pages
const OUT_DIR = "data";

// Controllo token
if (!WEBFLOW_TOKEN) {
  console.error("❌ Missing WEBFLOW_TOKEN environment variable");
  process.exit(1);
}

// Funzione principale
async function main() {
  console.log("🔄 Fetching all items from Webflow collection...");

  const allItems = await fetchAllItems(COLLECTION_ID);
  console.log(`✅ Found ${allItems.length} items`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  // Loop per ogni azienda
  for (const item of allItems) {
    const fd = item.fieldData || {};
    const slug = fd.slug || item.id;

    const payload = {
      company: fd.name || slug,
      reviews: Number(fd["numero-review"] ?? 0),
      rating: Number((fd["recensioni-ovreview-numero-4-6-5"] ?? "0").toString().replace(",", ".")),
      updated: new Date().toISOString(),
    };

    const filePath = `${OUT_DIR}/${slug}.json`;
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8");

    console.log(`📝 Saved ${filePath}`);
  }
}

// Funzione per scaricare tutti gli item con paginazione
async function fetchAllItems(collectionId) {
  const items = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `https://api.webflow.com/v2/collections/${collectionId}/items?limit=${limit}&offset=${offset}`;
    console.log(`⬇️ Fetching batch offset=${offset}...`);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Webflow API error ${res.status}: ${text}`);
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) break;

    items.push(...data.items);
    offset += limit;

    // 🔹 Paginazione sicura
    if (!data.pagination || offset >= data.pagination.total) break;

    // 🔹 Anti rate limit (60/minuto)
    await sleep(1000);
  }

  return items;
}

// Sleep helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Avvio
main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
