import fs from "fs";
import fetch from "node-fetch";

const token = process.env.WEBFLOW_TOKEN; // preso dal secret GitHub
const collectionId = "674d7153240404723fc12f5a"; // ✅ ID della collection "Welo Pages"
const url = `https://api.webflow.com/v2/collections/${collectionId}/items`;

async function main() {
  console.log("🔍 Fetching data from Webflow (API v2)...");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  console.log("🧾 Raw Response:", text);

  if (!response.ok) {
    console.error(`❌ HTTP Error ${response.status}:`, text);
    process.exit(1);
  }

  const data = JSON.parse(text);

  if (!data.items || data.items.length === 0) {
    console.error("⚠️ Nessun item trovato nella collection");
    process.exit(0);
  }

  // 🧠 Prendiamo il primo item della collezione
  const firstItem = data.items[0];

  // 🔢 Trova i campi giusti del CMS (es. numero_review, rating, ecc.)
  const result = {
    company: firstItem.name || "unknown",
    reviews: firstItem["numero-review"] || 0, // usa il campo CMS esatto
    rating: firstItem.rating || 0,
    updated: new Date().toISOString(),
  };

  // 📁 Salva il file JSON dentro /data
  fs.writeFileSync("./data/unknown.json", JSON.stringify(result, null, 2));

  console.log("✅ File aggiornato con successo!");
  console.log(result);
}

main();
