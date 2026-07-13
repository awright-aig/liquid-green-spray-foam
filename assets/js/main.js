const qs=(s,scope=document)=>scope.querySelector(s);const qsa=(s,scope=document)=>Array.from(scope.querySelectorAll(s));

document.addEventListener('DOMContentLoaded',()=>{
  /* --- Video hero fade-in --- */
  const heroVid=qs('.hero-video-wrap video');
  if(heroVid){
    heroVid.addEventListener('canplay',()=>{heroVid.closest('.hero-video-wrap').style.opacity='1'});
  }

  /* --- Mobile menu toggle --- */
  const toggle=qs('.mobile-toggle');const menu=qs('.nav-menu');
  if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false')})}
  qsa('.nav-item.has-dropdown>.nav-link').forEach(link=>{link.addEventListener('click',e=>{e.preventDefault();const open=link.parentElement.classList.toggle('open');link.setAttribute('aria-expanded',open?'true':'false')})});

  /* --- Carousels --- */
  qsa('.carousel').forEach(initCarousel);

  /* --- Scroll-aware header: transparent -> solid --- */
  const header=qs('.header');
  if(header){
    function checkScroll(){
      if(window.scrollY>60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    checkScroll();
    window.addEventListener('scroll',checkScroll,{passive:true});
  }

  /* --- Hero tagline rotation (like original "Improves Indoor Air Quality") --- */
  const taglineEl=qs('.hero-tagline span');
  if(taglineEl){
    const taglines=[
      'Improves Indoor Air Quality',
      'Increases Energy Efficiency',
      'Reduces Heating & Cooling Costs',
      'Prevents Mold Growth',
      'Class 1 Fire Rating'
    ];
    let ti=0;
    setInterval(()=>{
      ti=(ti+1)%taglines.length;
      taglineEl.style.opacity='0';
      taglineEl.style.transform='translateY(-10px)';
      setTimeout(()=>{
        taglineEl.textContent=taglines[ti];
        taglineEl.style.opacity='1';
        taglineEl.style.transform='translateY(0)';
      },400);
    },3500);
  }

  /* --- Scroll reveal animations --- */
  const reveals=qsa('.reveal');
  if(reveals.length && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el=>observer.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('visible'));
  }

});

function initCarousel(carousel){
  const viewport=qs('.carousel-viewport',carousel);const track=qs('.carousel-track',carousel);const cards=qsa('.card',track);const prev=qs('[data-prev]',carousel);const next=qs('[data-next]',carousel);const dotsWrap=qs('.dots',carousel);if(!viewport||!track||!cards.length)return;
  let index=0;let auto;const total=cards.length;
  cards.forEach((card,i)=>{card.setAttribute('tabindex','0');card.setAttribute('role','group');card.setAttribute('aria-label',`Slide ${i+1} of ${total}`)});
  if(dotsWrap){dotsWrap.innerHTML='';cards.forEach((_,i)=>{const b=document.createElement('button');b.className='dot';b.type='button';b.setAttribute('aria-label',`Go to slide ${i+1}`);b.addEventListener('click',()=>go(i));dotsWrap.appendChild(b)})}
  const dots=()=>qsa('.dot',dotsWrap||carousel);
  function perView(){if(window.innerWidth<=640)return 1;if(window.innerWidth<=980)return 2;return 3}
  function maxIndex(){return Math.max(0,total-perView())}
  function update(){index=Math.min(index,maxIndex());const cardWidth=cards[0].getBoundingClientRect().width+22;viewport.scrollTo({left:index*cardWidth,behavior:'smooth'});dots().forEach((d,i)=>d.classList.toggle('active',i===index));if(prev)prev.setAttribute('aria-disabled',index===0);if(next)next.setAttribute('aria-disabled',index===maxIndex())}
  function go(i){index=Math.max(0,Math.min(i,maxIndex()));update()}
  prev&&prev.addEventListener('click',()=>go(index-1));next&&next.addEventListener('click',()=>go(index+1));
  carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(index-1);if(e.key==='ArrowRight')go(index+1)});
  function start(){auto=setInterval(()=>{go(index>=maxIndex()?0:index+1)},5200)}function stop(){clearInterval(auto)}
  carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',start);carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',start);window.addEventListener('resize',update);update();start();
}
