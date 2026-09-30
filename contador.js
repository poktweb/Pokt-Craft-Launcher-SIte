// Gerenciador do Contador de Downloads
(function () {
  'use strict';

  const CLOUD_GET_URL = 'https://abacus.jasoncameron.dev/get/poktcraft-launcher/downloads-v1';
  const CLOUD_HIT_URL = 'https://abacus.jasoncameron.dev/hit/poktcraft-launcher/downloads-v1';
  const API_ENDPOINT = '/api/downloads';

  let currentCount = null;

  function formatCount(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
  }

  function renderCount(num) {
    if (num === null || num === undefined || isNaN(num)) return;
    currentCount = Number(num);
    const elements = document.querySelectorAll('.download-counter-value');
    elements.forEach(function (el) {
      el.textContent = formatCount(currentCount);
    });
  }

  // 1. Carregar contagem inicial
  async function loadCount() {
    // Tenta primeiro /api/downloads (Vercel Serverless Function)
    try {
      const res = await fetch(API_ENDPOINT);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.downloads === 'number') {
          renderCount(data.downloads);
          return;
        }
      }
    } catch (_) {
      // Ignora erro e tenta nuvem direta
    }

    // Se a API interna falhar (ex: rodando localmente sem Vercel), tenta direto na nuvem
    try {
      const res = await fetch(CLOUD_GET_URL);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.value === 'number') {
          renderCount(data.value);
          return;
        }
      } else if (res.status === 404) {
        // Ainda sem downloads na nuvem
        renderCount(0);
        return;
      }
    } catch (_) {
      // Ignora erro e vai para o downloads.json
    }

    // Fallback: lê downloads.json estático
    try {
      const res = await fetch('downloads.json');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.downloads === 'number') {
          renderCount(data.downloads);
          return;
        }
      }
    } catch (_) {
      renderCount(0);
    }
  }

  // 2. Incrementar contagem ao clicar em qualquer botão de download
  function trackDownload() {
    if (currentCount !== null) {
      renderCount(currentCount + 1);
    }

    // Tenta registrar na API interna
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(API_ENDPOINT);
      } else {
        fetch(API_ENDPOINT, { method: 'POST', keepalive: true }).catch(function () {});
      }
    } catch (_) {
      // Fallback direto na nuvem
      fetch(CLOUD_HIT_URL, { keepalive: true }).catch(function () {});
    }
  }

  function init() {
    // Carrega dados assim que o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadCount);
    } else {
      loadCount();
    }

    // Anexa listeners a todos os links com a classe btn-download-tracker
    const buttons = document.querySelectorAll('.btn-download-tracker');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', trackDownload);
    });
  }

  init();
})();
