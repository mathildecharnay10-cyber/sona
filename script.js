/* nav scroll state + hero parallax */
const hd=document.getElementById('hd');
const aurora=document.getElementById('aurora');
const heroForm=document.querySelector('.hero-form');
let ticking=false;
function onScroll(){
  hd.classList.toggle('scrolled',scrollY>20);
  if(!ticking){requestAnimationFrame(()=>{
    const y=scrollY;
    if(y<1100){
      if(aurora) aurora.style.transform='translateY('+(y*0.16)+'px)';
      if(heroForm) heroForm.style.translate='0 '+(y*0.10)+'px';
    }
    ticking=false;
  });ticking=true;}
}
addEventListener('scroll',onScroll,{passive:true});

/* mobile menu */
document.getElementById('burger').addEventListener('click',()=>hd.classList.toggle('menu-open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>hd.classList.remove('menu-open')));

/* reveal on scroll */
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* button cursor glow */
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left)+'px');b.style.setProperty('--my',(e.clientY-r.top)+'px')});
});

/* bento cursor spotlight */
document.querySelectorAll('.cell').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--cx',(e.clientX-r.left)+'px');c.style.setProperty('--cy',(e.clientY-r.top)+'px')});
});

/* animated counters */
const counters=document.querySelectorAll('.count');
const cio=new IntersectionObserver((es)=>{es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  const el=e.target,to=+el.dataset.to;let t0=null;const dur=1400;
  const step=(t)=>{if(!t0)t0=t;const p=Math.min((t-t0)/dur,1);const ease=1-Math.pow(1-p,3);el.textContent=Math.round(to*ease);if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
})},{threshold:.6});
counters.forEach(c=>cio.observe(c));

/* faq accordion */
document.querySelectorAll('.q').forEach(q=>{
  const h=q.querySelector('.qh'),b=q.querySelector('.qb');
  h.addEventListener('click',()=>{
    const open=q.classList.contains('open');
    document.querySelectorAll('.q').forEach(o=>{o.classList.remove('open');o.querySelector('.qb').style.maxHeight=null});
    if(!open){q.classList.add('open');b.style.maxHeight=b.scrollHeight+'px'}
  });
});

/* duplicate marquee for seamless loop already handled by 2x content */

/* hero dashboard comes to life (chart draws, KPIs count, invoices cascade, one flips to "Encaissée") */
(()=>{
  const hd=document.querySelector('.hero-dash');if(!hd)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const run=()=>{
    hd.classList.add('play');
    hd.querySelectorAll('.dnum').forEach(el=>{
      const to=+el.dataset.to,suf=el.dataset.suffix||'';
      if(reduce){el.textContent=to.toLocaleString('fr-FR')+suf;return;}
      const dur=1500;let t0=null;
      const step=t=>{if(!t0)t0=t;const p=Math.min((t-t0)/dur,1);const e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e).toLocaleString('fr-FR')+suf;if(p<1)requestAnimationFrame(step);};
      requestAnimationFrame(step);
    });
    const flip=hd.querySelector('.inv-flip .st');
    if(flip&&!reduce){setTimeout(()=>{flip.classList.add('flipping');setTimeout(()=>{flip.classList.remove('sent');flip.classList.add('paid');flip.textContent='Encaissée';flip.classList.remove('flipping');},230);},1800);}
  };
  let done=false;const start=()=>{if(done)return;done=true;run();};
  const inView=()=>hd.getBoundingClientRect().top < innerHeight*0.92;
  if(inView()){requestAnimationFrame(start);}
  else{
    const o=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){o.disconnect();start();}});},{threshold:.2});o.observe(hd);
    addEventListener('scroll',function sc(){if(inView()){removeEventListener('scroll',sc);start();}},{passive:true});
  }
})();
