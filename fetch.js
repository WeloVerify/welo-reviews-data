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
      console.log("❌ Nessun elemento trovato nella collection Webflow.");
      return;
    }

    // Assicuriamoci che la cartella data esista
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
    }

    for (const item of data.items) {
      const fields = item.fieldData;

      const companyName = fields["name"] || "unknown";
      const reviews = parseInt(fields["numero-review"]) || 0;
      const rating = parseFloat(fields["recensioni-ovreview-numero-4-6-5"]) || 0;

      const output = {
        company: companyName,
        reviews: reviews,
        rating: rating,
        updated: new Date().toISOString(),
      };

      // Sanitize nome file (tutto minuscolo, no spazi)
      const fileName = companyName.toLowerCase().replace(/\s+/g, "-");

      fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(output, null, 2));
      console.log(`✅ File creato: data/${fileName}.json`);
    }

    console.log("🎉 Tutti i file sono stati aggiornati con successo!");
  } catch (err) {
    console.error("❌ Errore nel fetch Webflow:", err);
  }
}

fetchData();
