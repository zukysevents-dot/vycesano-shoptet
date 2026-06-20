/* ============================================================
   Vyčesáno.cz – scroll-reveal animace (lehké, bez knihoven)
   IntersectionObserver. Failsafe odhalí vše do 2,6 s.
   ============================================================ */
(function(){
  if(!('IntersectionObserver' in window)) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SEL = '.products-block .product, .vhg-card, .content .homepage-group-title, .content-wrapper .homepage-group-title';

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, {rootMargin:'0px 0px -8% 0px', threshold:.08});

  function scan(){
    [].slice.call(document.querySelectorAll(SEL)).forEach(function(el){
      if(el.classList.contains('vz-reveal')) return;
      el.classList.add('vz-reveal');
      io.observe(el);
    });
  }

  function init(){
    scan();
    setTimeout(scan, 800); /* znovu po pozdních injekcích (hero, produkty) */
    setTimeout(function(){  /* failsafe: nic nesmí zůstat skryté */
      [].slice.call(document.querySelectorAll('.vz-reveal:not(.is-in)')).forEach(function(el){
        el.classList.add('is-in');
      });
    }, 2600);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', scan);
})();
