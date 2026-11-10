/* Previews: sem Pixel ou Google Analytics. Mantém UTMs para links externos da Kiwify. */
const keys=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
const params=new URLSearchParams(location.search);
document.querySelectorAll("a[data-checkout]").forEach(link=>{const url=new URL(link.href);for(const k of keys){if(params.has(k))url.searchParams.set(k,params.get(k));}link.href=url.toString();});
