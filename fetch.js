import fs from "fs";
import fetch from "node-fetch";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.COLLECTION_ID;
const BASE_URL = `https://api.webflow.com/collections/${COLLECTION_ID}/items`;

// Funzione per fetch con paginazione automatica
async function fetchAllItems() {
  let allItems = [];
  let offset = 0;
  const limit = 100;

  console.log("🔄 Inizio fetch di tutti gli items da Webflow...");

  while (true) {
    const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        "accept-version": "1.0.0",
      },
    });

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      break;
    }

    allItems = [...allItems, ...data.items];
    offset += limit;

    console.log(`✅ Recuperati ${data.items.length} items (totale: ${allItems.length})`);

    // Se meno di 100 risultati → fine
    if (data.items.length < limit) break;
  }

  console.log(`🎉 Totale finale: ${allItems.length} aziende trovate.`);
  return allItems;
}

// Funzione principale
async function main() {
  try {
    const items = await fetchAllItems();

    if (items.length === 0) {
      console.log("❌ Nessun elemento trovato nella collection Webflow.");
      return;
    }

    // Crea la cartella "data" se non esiste
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
    }

    for (const item of items) {
      const fields = item.fieldData || {};

      const companyName = fields["name"]?.trim() || "unknown";
      const reviews = Number(fields["numero-review"]) || 0;
      const rating = Number(fields["recensioni-ovreview-numero-4-6-5"]) || 0;

      const output = {
        company: companyName,
        reviews: reviews,
        rating: rating,
        updated: new Date().toISOString(),
      };

      const fileName = companyName.toLowerCase().replace(/\s+/g, "-");

      fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(output, null, 2));
      console.log(`💾 File aggiornato: data/${fileName}.json`);
    }

    console.log("✅ Tutti i file JSON sono stati creati e aggiornati con successo!");
  } catch (err) {
    console.error("❌ Errore durante il fetch Webflow:", err.message);
  }
}

main();
