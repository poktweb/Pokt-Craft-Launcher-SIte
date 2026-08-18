/* Substitua o e-mail ANTES de publicar o site (Google mostra isto no ecrã OAuth). */
window.POKT_SITE = {
  supportEmail: 'COLOQUE-SEU-EMAIL@dominio.com'
}

document.addEventListener('DOMContentLoaded', () => {
  const email = (window.POKT_SITE && window.POKT_SITE.supportEmail) || ''
  const placeholder = !email || email.startsWith('COLOQUE-SEU-EMAIL')
  document.querySelectorAll('[data-support-email]').forEach((el) => {
    el.textContent = placeholder ? 'defina o e-mail em config.js' : email
    if (el.tagName === 'A' && !placeholder) el.setAttribute('href', 'mailto:' + email)
  })
  document.querySelectorAll('[data-setup-banner]').forEach((el) => {
    el.hidden = !placeholder
  })
})
