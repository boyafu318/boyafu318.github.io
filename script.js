const copy = window.PORTFOLIO_CONTENT;
for (const [id, key] of Object.entries({'intro':'intro','thesis-summary':'thesisSummary','about-intro':'aboutIntro','about-body':'aboutBody'})) {
  document.getElementById(id).textContent = copy[key];
}
const svgNS = 'http://www.w3.org/2000/svg';
const network = document.getElementById('network');
const nodes = Array.from({length: 24}, (_, i) => {
  const angle = i * Math.PI * 2 / 24;
  const radius = 104 + (i % 4) * 23;
  return {x: 250 + Math.cos(angle) * radius, y: 220 + Math.sin(angle) * radius};
});
nodes.forEach((node, i) => {
  const next = nodes[(i + 7) % nodes.length];
  const line = document.createElementNS(svgNS, 'line');
  Object.entries({x1:node.x,y1:node.y,x2:next.x,y2:next.y,stroke:'#c9b7f2','stroke-width':1}).forEach(([key,value]) => line.setAttribute(key,value));
  line.classList.add('connection'); network.append(line);
  const dot = document.createElementNS(svgNS,'circle');
  Object.entries({cx:node.x,cy:node.y,r:i%3===0?5:3,fill:i%3===0?'#d8ff6e':'#c9b7f2'}).forEach(([key,value])=>dot.setAttribute(key,value)); network.append(dot);
});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  const evidence=button.dataset.mode==='evidence';
  document.querySelector('.mind-panel').classList.toggle('evidence-mode',evidence);
  document.getElementById('core-label').textContent=evidence?'why?':'aha!';
  document.getElementById('mode-caption').textContent=evidence?'“Can I use it in a new situation?” Application gives us something to examine.':'“It makes sense to me.” But what can I explain or apply?';
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
document.querySelector('.details-toggle').addEventListener('click',function(){
  const open=this.getAttribute('aria-expanded')==='true';
  this.setAttribute('aria-expanded',String(!open));
  document.getElementById('thesis-details').hidden=open;
  this.querySelector('span').textContent=open?'+':'−';
});
