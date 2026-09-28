/* SICO — human-first interaction layer */
(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function dedupe(selector,keySelector){const seen=new Set();$$(selector).forEach(card=>{const n=$(keySelector,card);if(!n)return;const k=n.textContent.replace(/\s+/g," ").trim().toLowerCase();if(!k)return;if(seen.has(k))card.remove();else seen.add(k)})}
function reveals(){const nodes=$$(".section-header,.event-card,.event-card-modern,.portal-card,.hub-card,.portal-item,.team-card,.gallery-item,.report-preview-card,.contact-item,.faq-item,.sico-pillar,.about-image,.about-content > *,.sico-content > *");if(!("IntersectionObserver" in window)){nodes.forEach(n=>n.classList.add("is-visible"));return}nodes.forEach((n,i)=>{n.classList.add("reveal-sx");n.style.transitionDelay=Math.min(i%7*45,270)+"ms"});const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.08});nodes.forEach(n=>io.observe(n))}
function nav(){const h=$(".header");if(!h)return;let last=0;addEventListener("scroll",()=>{const y=scrollY;h.classList.toggle("sx-hidden-on-scroll",y>last&&y>260);h.classList.toggle("sx-scrolled",y>50);last=y},{passive:true})}
function images(){$$("img").forEach(i=>{if(!i.hasAttribute("decoding"))i.decoding="async";if(!i.hasAttribute("loading")&&!i.closest(".hero"))i.loading="lazy"})}
function polish(){$$("a[target='_blank']").forEach(a=>{a.rel=a.rel||"noopener noreferrer"});addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea|select/i.test(document.activeElement?.tagName||"")){const s=$("[type='search'],.team-search-input,#siteSearchInput");if(s){e.preventDefault();s.focus()}}})}
function init(){if(location.pathname.endsWith("/index.html")||location.pathname==="/"||location.pathname.endsWith("/SICO-Website/"))dedupe("#team-marquee .team-card",".team-name");reveals();nav();images();polish();document.body.classList.add("sx-ready")}
window.SICO_REDESIGN_INIT=init;
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();