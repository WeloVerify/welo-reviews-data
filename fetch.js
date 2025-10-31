// fetch.js — aggiorna data/welo.json leggendo la collection "Welo Pages" (v2 API)

import fs from "node:fs/promises";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID || "674d7153240404723fc12f5a"; // Welo Pages
const TARGET_SLUG = process.env.WEBFLOW_ITEM_SLUG || "welo"; // l'item che vuoi leggere
const OUT_DIR = "data";
const OUT_FILE = `${OUT_DIR}/welo.json`; // smettiamo di scrivere "unknown.json"

if (!WEBFLOW_TOKEN) {
  console.error("Missing WEBFLOW_TOKEN env var");
  process.exit(1);
}

async function main() {
  // 1) Prendo TUTTI gli item della collection (hai 1 item, quindi è leggero)
  const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
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
  const items = Array.isArray(data.items) ? data.items : [];

  // 2) Trovo l'item con slug = "welo"
  const item = items.find((it) => it.fieldData?.slug === TARGET_SLUG);
  if (!item) {
    throw new Error(`Item with slug "${TARGET_SLUG}" not found in collection ${COLLECTION_ID}`);
  }

  // 3) Mappo i campi REALI dal tuo CMS
  const fd = item.fieldData || {};
  const company = fd.name || "Welo";
  // "numero-review" è Number (1496)
  const reviews = Number(fd["numero-review"] ?? 0);
  // "recensioni-ovreview-numero-4-6-5" è stringa "4.6"
  const rating = Number((fd["recensioni-ovreview-numero-4-6-5"] ?? "0").toString().replace(",", "."));
  const updated = new Date().toISOString();

  // 4) Preparo l’oggetto finale
  const payload = {
    company,
    reviews,
    rating,
    updated,
  };

  // 5) Scrivo su data/welo.json (creo la cartella se non esiste)
  await fs.mkdir(OUT_DIR, { recursive: true });
  const previous = await safeReadJSON(OUT_FILE);

  // Commit solo se cambiano i valori (evita commit “vuoti”)
  const changed =
    !previous ||
    previous.company !== payload.company ||
    previous.reviews !== payload.reviews ||
    previous.rating !== payload.rating ||
    !previous.updated;

  if (!changed) {
    console.log("No changes. Skipping write.");
    return;
  }

  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log("Updated:", payload);
}

async function safeReadJSON(path) {
  try {
    const txt = await fs.readFile(path, "utf8");
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
