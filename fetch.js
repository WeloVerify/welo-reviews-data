import axios from "axios";
import fs from "fs-extra";

const token = process.env.WEBFLOW_TOKEN;
const collectionId = process.env.COLLECTION_ID;

async function main() {
  console.log("📡 Fetching Webflow CMS data...");

  const res = await axios.get(`https://api.webflow.com/v2/collections/${collectionId}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const items = res.data.items;
  await fs.ensureDir("data");

  for (const item of items) {
    // 🔹 Campi dal CMS
    const name = item.fieldData["nome-azienda"] || "unknown";
    const reviews = item.fieldData["numero-review"] || 0;
    const rating = item.fieldData["recensioni-ovreview-numero"] || 0;

    // 🔹 Slug leggibile per il nome file
    const company = name.toLowerCase().replace(/\s+/g, "-");

    const data = {
      company,
      reviews,
      rating,
      updated: new Date().toISOString()
    };

    await fs.writeJson(`data/${company}.json`, data, { spaces: 2 });
    console.log(`✅ Updated ${company}.json`);
  }

  console.log("🎉 All JSON files updated!");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
