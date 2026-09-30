// Serverless function para Vercel
// Retorna a contagem atual e incrementa quando recebe POST

const fs = require('fs');
const path = require('path');

const CLOUD_GET_URL = 'https://abacus.jasoncameron.dev/get/poktcraft-launcher/downloads-v1';
const CLOUD_HIT_URL = 'https://abacus.jasoncameron.dev/hit/poktcraft-launcher/downloads-v1';

function getLocalCount() {
  try {
    const jsonPath = path.join(process.cwd(), 'downloads.json');
    if (fs.existsSync(jsonPath)) {
      const content = fs.readFileSync(jsonPath, 'utf8');
      const parsed = JSON.parse(content);
      return typeof parsed.downloads === 'number' ? parsed.downloads : 0;
    }
  } catch (err) {
    // fallback ignorado
  }
  return 0;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const localCount = getLocalCount();

  if (req.method === 'POST') {
    try {
      const response = await fetch(CLOUD_HIT_URL);
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ downloads: data.value, source: 'cloud' });
      }
    } catch (err) {
      console.error('Erro ao incrementar na nuvem:', err);
    }

    return res.status(200).json({ downloads: localCount + 1, source: 'local_fallback' });
  }

  // GET
  try {
    const response = await fetch(CLOUD_GET_URL);
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.value === 'number') {
        return res.status(200).json({ downloads: data.value, source: 'cloud' });
      }
    } else if (response.status === 404) {
      // Nenhum download registrado ainda na chave limpa
      return res.status(200).json({ downloads: 0, source: 'cloud_clean' });
    }
  } catch (err) {
    console.error('Erro ao ler da nuvem:', err);
  }

  return res.status(200).json({ downloads: localCount, source: 'local_json' });
};
