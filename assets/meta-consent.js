/* Make Me Angel — Meta Pixel 1180097106601724: carregamento após opt-in. */
/* Sem beacon noscript: ele não permitiria obter consentimento em visitantes sem JavaScript. */
(function(){
  "use strict";
  const PIXEL_ID = "1180097106601724";
  const STORAGE_KEY = "mma_meta_marketing_consent_v1";
  const banner = document.getElementById("mmaCookieBanner");
  const accept = document.getElementById("mmaCookieAccept");
  const reject = document.getElementById("mmaCookieReject");
  const settings = document.getElementById("mmaCookieSettings");
  if (!banner || !accept || !reject || !settings) return;
  let consent;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    consent = saved === "granted" || saved === "denied" ? saved : null;
  } catch (_) {
    consent = null;
  }
  let pixelStarted = false;

  function startPixel() {
    if (pixelStarted) return;
    pixelStarted = true;
    // Carrega o snippet oficial somente quando o visitante autorizou marketing.
    !function(f,b,e,v,n,t,s) {
      if (f.fbq) return;
      n = f.fbq = function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    if (typeof window.fbq === "function") {
      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");
    }
  }

  function choose(value) {
    consent = value;
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    banner.hidden = true;
    if (value === "granted") {
      startPixel();
    } else if (pixelStarted) {
      // Evita novos eventos na página já iniciada e reinicia sem o pixel ativo.
      if (typeof window.fbq === "function") window.fbq("consent", "revoke");
      window.location.reload();
    }
  }

  accept.addEventListener("click", function(){ choose("granted"); });
  reject.addEventListener("click", function(){ choose("denied"); });
  settings.addEventListener("click", function(){
    banner.hidden = false;
    accept.focus();
  });

  document.querySelectorAll("a[data-checkout]").forEach(function(link) {
    link.addEventListener("click", function() {
      if (consent === "granted" && typeof window.fbq === "function") {
        // Apenas interesse no checkout: nunca dispare Purchase na landing page.
        window.fbq("trackCustom", "CheckoutClick", { content_name: "Protocolos de Atendimento 3X" });
      }
    });
  });

  if (consent === "granted") startPixel();
  else if (consent !== "denied") banner.hidden = false;
})();
