/* Galerias de trajetória: rolagem nativa por toque + setas acessíveis. */
(()=>{"use strict";
for(const root of document.querySelectorAll("[data-angel-gallery]")){
 const track=root.querySelector("[data-angel-track]");
 const slides=[...track.querySelectorAll(".angel-gallery__slide")];
 const prev=root.querySelector("[data-angel-prev]");
 const next=root.querySelector("[data-angel-next]");
 const status=root.querySelector("[data-angel-status]");
 if(!track||!slides.length||!prev||!next)continue;
 const positions=()=>slides.map(el=>el.offsetLeft-slides[0].offsetLeft);
 const current=()=>{
  const at=track.scrollLeft;const list=positions();let idx=0;
  list.forEach((left,i)=>{if(Math.abs(left-at)<Math.abs(list[idx]-at))idx=i});
  return idx;
 };
 const update=()=>{
  const at=track.scrollLeft,limit=Math.max(0,track.scrollWidth-track.clientWidth);
  prev.disabled=at<=2;next.disabled=at>=limit-2;
  if(status)status.textContent=(current()+1)+" / "+slides.length;
 };
 function move(delta){
  const list=positions();const idx=Math.min(slides.length-1,Math.max(0,current()+delta));
  const limit=Math.max(0,track.scrollWidth-track.clientWidth);
  track.scrollTo({left:Math.min(list[idx],limit),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 }
 prev.addEventListener("click",()=>move(-1));
 next.addEventListener("click",()=>move(1));
 track.addEventListener("scroll",update,{passive:true});
 track.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();move(e.key==="ArrowRight"?1:-1)}});
 window.addEventListener("resize",update,{passive:true});
 update();
}
})();