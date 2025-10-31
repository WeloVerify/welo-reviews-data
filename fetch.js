import fs from "fs";
import fetch from "node-fetch";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.COLLECTION_ID;
const URL = `https://api.webflow.com/collections/${COLLECTION_ID}/items?limit=100`;

async function fetchData() {
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        "accept-version": "1.0.0",
      },
    });

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      console.log("Nessun elemento trovato nella collection Webflow.");
      return;
    }

    const item = data.items[0];
    const fields = item.fieldData;

    // Preleva i dati principali
    const companyName = fields["name"] || "unknown";
    const reviews = parseInt(fields["numero-review"]) || 0;
    const rating = parseFloat(fields["recensioni-ovreview-numero-4-6-5"]) || 0;

    const output = {
      company: companyName,
      reviews: reviews,
      rating: rating,
      updated: new Date().toISOString(),
    };

    // Salva i dati nel file JSON
    fs.writeFileSync("./data/welo.json", JSON.stringify(output, null, 2));
    console.log("✅ File aggiornato con successo:", output);
  } catch (err) {
    console.error("❌ Errore nel fetch Webflow:", err);
  }
}

fetchData();

