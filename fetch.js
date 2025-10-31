import fs from "fs";
import fetch from "node-fetch";

const token = process.env.WEBFLOW_TOKEN;
const siteId = "672c7e4b5413fe846587b57a";
const collectionId = "675debb8228efbec9bc62c0d"; // Tutte le recensioni

const url = `https://api.webflow.com/collections/${collectionId}/items`;

async function main() {
  console.log("🔍 Fetching data from Webflow...");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "accept-version": "1.0.0",
    },
  });

  if (!response.ok) {
    console.error("❌ Error:", response.status, await response.text());
    process.exit(1);
  }

  const data = await response.json();

  console.log("✅ Response received from Webflow:");
  console.log(JSON.stringify(data, null, 2)); // Mostra tutto

  if (!data.items || data.items.length === 0) {
    console.error("⚠️ Nessun item trovato nella collection");
    process.exit(0);
  }

  const firstItem = data.items[0];

  const result = {
    company: firstItem.name || "unknown",
    reviews: firstItem.reviews || 0,
    rating: firstItem.rating || 0,
    updated: new Date().toISOString(),
  };

  fs.writeFileSync("./data/unknown.json", JSON.stringify(result, null, 2));
  console.log("💾 File aggiornato con successo!");
}

main();
