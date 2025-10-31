// fetch.js — scarica TUTTE le aziende e crea un file JSON per ciascuna

import fs from "node:fs/promises";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID || "674d7153240404723fc12f5a"; // Welo Pages
const OUT_DIR = "data";

if (!WEBFLOW_TOKEN) {
  console.error("Missing WEBFLOW_TOKEN env var");
  process.exit(1);
}

async function main() {
  console.log("Fetching all items from Webflow collection...");

  const allItems = await fetchAllItems(COLLECTION_ID);

  console.log(`✅ Found ${allItems.length} items`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const item of allItems) {
    const fd = item.fieldData || {};
    const slug = fd.slug || item.id;

    const payload = {
      company: fd.name || slug,
      reviews: Number(fd["numero-review"] ?? 0),
      rating: Number((fd["recensioni-ovreview-numero-4-6-5"] ?? "0").toString().replace(",", ".")),
      updated: new Date().toISOString(),
    };

    const file = `${OUT_DIR}/${slug}.json`;
    await fs.writeFile(file, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`📝 Saved ${file}`);
  }
}

async function fetchAllItems(collectionId) {
  const items = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(
      `https://api.webflow.com/v2/collections/${collectionId}/items?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Webflow API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    if (!data.items || data.items.length === 0) break;

    items.push(...data.items);
    offset += limit;

    if (offset >= data.pagination.total) break;
  }

  return items;
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
// fetch.js — scarica TUTTE le aziende e crea un file JSON per ciascuna

import fs from "node:fs/promises";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID || "674d7153240404723fc12f5a"; // Welo Pages
const OUT_DIR = "data";

if (!WEBFLOW_TOKEN) {
  console.error("Missing WEBFLOW_TOKEN env var");
  process.exit(1);
}

async function main() {
  console.log("Fetching all items from Webflow collection...");

  const allItems = await fetchAllItems(COLLECTION_ID);

  console.log(`✅ Found ${allItems.length} items`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const item of allItems) {
    const fd = item.fieldData || {};
    const slug = fd.slug || item.id;

    const payload = {
      company: fd.name || slug,
      reviews: Number(fd["numero-review"] ?? 0),
      rating: Number((fd["recensioni-ovreview-numero-4-6-5"] ?? "0").toString().replace(",", ".")),
      updated: new Date().toISOString(),
    };

    const file = `${OUT_DIR}/${slug}.json`;
    await fs.writeFile(file, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`📝 Saved ${file}`);
  }
}

async function fetchAllItems(collectionId) {
  const items = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(
      `https://api.webflow.com/v2/collections/${collectionId}/items?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Webflow API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    if (!data.items || data.items.length === 0) break;

    items.push(...data.items);
    offset += limit;

    if (offset >= data.pagination.total) break;
  }

  return items;
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
