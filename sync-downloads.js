// Script para sincronizar public/downloads.json com a nuvem
// Uso: node sync-downloads.js

const fs = require("fs");
const path = require("path");

const CLOUD_GET_URL = "https://abacus.jasoncameron.dev/get/poktcraft-launcher/downloads-v1";
const jsonPath = path.join(__dirname, "public", "downloads.json");

async function sync() {
  console.log("Consultando contagem de downloads na nuvem...");
  try {
    const res = await fetch(CLOUD_GET_URL);
    if (res.status === 404) {
      const payload = {
        project: "Pokt Craft Launcher",
        downloads: 0,
        last_updated: new Date().toISOString()
      };
      fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
      console.log("✓ downloads.json sincronizado com sucesso: 0 downloads.");
      return;
    }

    if (!res.ok) {
      throw new Error(`Status HTTP ${res.status}`);
    }

    const data = await res.json();
    if (typeof data.value === "number") {
      const payload = {
        project: "Pokt Craft Launcher",
        downloads: data.value,
        last_updated: new Date().toISOString()
      };
      fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
      console.log(`✓ downloads.json atualizado com sucesso: ${data.value} downloads.`);
    } else {
      console.error("Resposta inesperada da API:", data);
    }
  } catch (err) {
    console.error("Falha ao sincronizar downloads.json:", err.message);
  }
}

sync();
