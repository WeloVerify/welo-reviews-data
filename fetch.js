import fs from "fs";
import fetch from "node-fetch";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.COLLECTION_ID;
const BASE_URL = `https://api.webflow.com/collections/${COLLECTION_ID}/items`;

async function fetchAllItems() {
  let allItems = [];
  let offset = 0;
  const limit = 100;

  console.log("🔄 Avvio recupero dati da Webflow...");

  while (true) {
    const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        "accept-version": "1.0.0",
      },
    });

    const data = await response.json();

    if (!data.items || data.items.length === 0) break;

    allItems = [...allItems, ...data.items];
    offset += limit;

    console.log(`📦 Recuperati ${data.items.length} elementi (totale: ${allItems.length})`);
    if (data.items.length < limit) break;
  }

  console.log(`🎯 Totale finale: ${allItems.length} aziende trovate.`);
  return allItems;
}

async function main() {
  try {
    const items = await fetchAllItems();

    if (!fs.existsSync("./data")) fs.mkdirSync("./data");

    for (const item of items) {
      const f = item.fieldData || {};

      const name = f["name"] || "unknown";
      const reviews = parseInt(f["numero-review"]) || 0;
      const rating = parseFloat(f["recensioni-ovreview-numero-4-6-5"]) || 0;

      const fileName = name.toLowerCase().replace(/\s+/g, "-");

      const result = {
        company: name,
        reviews,
        rating,
        updated: new Date().toISOString(),
      };

      fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(result, null, 2));
      console.log(`✅ File aggiornato: data/${fileName}.json`);
    }

    console.log("🎉 Tutti i dati salvati con successo!");
  } catch (err) {
    console.error("❌ Errore nel fetch:", err);
  }
}

main();
