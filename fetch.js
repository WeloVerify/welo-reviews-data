import fetch from "node-fetch";

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;
const COLLECTION_ID = process.env.COLLECTION_ID;
const URL = `https://api.webflow.com/collections/${COLLECTION_ID}/items?limit=1`;

async function debug() {
  const res = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      "accept-version": "1.0.0",
    },
  });

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    console.log("❌ Nessun elemento trovato.");
    return;
  }

  console.log("✅ Ecco le chiavi di fieldData disponibili:\n");
  console.log(Object.keys(data.items[0].fieldData));
}

debug();

