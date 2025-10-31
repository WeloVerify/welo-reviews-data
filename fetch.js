import axios from "axios";
import fs from "fs-extra";

const token = process.env.WEBFLOW_TOKEN;
const collectionId = process.env.COLLECTION_ID;

async function main() {
  console.log("Fetching Webflow CMS data...");
  const res = await axios.get(`https://api.webflow.com/v2/collections/${collectionId}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const items = res.data.items;
  await fs.ensureDir("data");

  for (const item of items) {
    const name = item.fieldData["nome-azienda"] || "unknown";
    const company = name.toLowerCase().replace(/\s+/g, "-");
    const reviews = item.fieldData["numero-review"];
    const rating = item.fieldData["recensioni-ovreview-numero"];

    const data = {
      company,
      reviews,
      rating,
      updated: new Date().toISOString()
    };

    await fs.writeJson(`data/${company}.json`, data, { spaces: 2 });
  }

  console.log("✅ JSON files updated!");
}

main().catch(err => console.error("❌ Error:", err));
