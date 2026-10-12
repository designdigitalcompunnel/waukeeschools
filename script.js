(() => {
  const header=document.querySelector('.site-header');
  const progress=document.querySelector('.scroll-progress');
  const menuButton=document.querySelector('.menu-toggle');
  const heroVideo=document.querySelector('.hero-video');
  const searchForm=document.querySelector('.header-search');
  const searchToggle=document.querySelector('.search-toggle');
  const searchInput=document.querySelector('.header-search-input');
  if(searchForm && searchToggle){searchToggle.addEventListener('click',()=>{const open=searchForm.classList.toggle('is-open');searchToggle.setAttribute('aria-expanded',String(open));searchToggle.setAttribute('aria-label',open?'Close search':'Open search');if(open && searchInput)searchInput.focus();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&searchForm.classList.contains('is-open')){searchForm.classList.remove('is-open');searchToggle.setAttribute('aria-expanded','false');searchToggle.setAttribute('aria-label','Open search');searchToggle.focus();}});}
  if(heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches){heroVideo.pause();heroVideo.removeAttribute('autoplay');}
  const nav=document.querySelector('.main-nav');
  const updateScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;header.classList.toggle('scrolled',window.scrollY>12)};
  window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
  menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -20px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const node=entry.target,target=Number(node.dataset.count||0),suffix=node.dataset.suffix||'',start=performance.now(),duration=1000;const frame=now=>{const t=Math.min((now-start)/duration,1),eased=1-Math.pow(1-t,4);node.textContent=`${Math.round(target*eased).toLocaleString('en-US')}${suffix}`;if(t<1)requestAnimationFrame(frame)};requestAnimationFrame(frame);counterObserver.unobserve(node)}),{threshold:.6});document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));
  } else {document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))}
  const newsletterForm=document.querySelector('#newsletter-form');
  if(newsletterForm){
    const emailInput=newsletterForm.querySelector('input[type="email"]');
    const message=newsletterForm.querySelector('#newsletter-message');
    newsletterForm.addEventListener('submit',event=>{
      event.preventDefault();
      if(!emailInput.checkValidity()){
        emailInput.reportValidity();
        message.textContent='Please enter a valid email address.';
        message.classList.remove('is-success');
        message.classList.add('is-error');
        emailInput.focus();
        return;
      }
      message.textContent='Thanks! Your email is valid. Connect a mailing-list service to securely activate subscriptions.';
      message.classList.remove('is-error');
      message.classList.add('is-success');
      emailInput.setAttribute('aria-invalid','false');
    });
    emailInput.addEventListener('input',()=>{
      message.textContent='No spam. Just useful district updates.';
      message.classList.remove('is-error','is-success');
      emailInput.removeAttribute('aria-invalid');
    });
  }
  const yearNode=document.querySelector('#year');if(yearNode)yearNode.textContent=new Date().getFullYear();
})();