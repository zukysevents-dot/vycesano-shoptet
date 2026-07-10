/* ============================================================
   Vyčesáno.cz – hero na titulce
   Benefit copy + 2 CTA + trust řádek + 3 kategorie karty.
   Pozadí (foto pes+kočka) a loga značek doplňuje hero-assets.js.
   ============================================================ */
(function(){
  function isHome(){
    var p = location.pathname.replace(/\/+$/, '');
    if(p === '' || p === '/') return true;
    var b = document.body;
    return !!(b && (b.classList.contains('type-index') || b.classList.contains('in-index')));
  }

  function ico(name){
    var P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var d={
      truck:'<path d="M1 5h13v11H1zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
      bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
      undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
      paw:'<circle cx="7" cy="8.5" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="8.5" r="1.8"/><path d="M12 11.5c-2.6 0-5.5 2.5-5.5 5 0 1.4 1.1 2.5 2.5 2.5 1.1 0 2-.5 3-.5s1.9.5 3 .5c1.4 0 2.5-1.1 2.5-2.5 0-2.5-2.9-5-5.5-5z"/>',
      brush:'<path d="M4 14c3-1 5-1 8 0s5 1 8 0"/><path d="M6 14V8m4 6V6m4 8V8m4 6V9"/><path d="M4 14v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"/>',
      spark:'<path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.8 2.8m8.4 8.4L19 19M19 5l-2.8 2.8M7.8 16.2 5 19"/>',
      heart:'<path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.6 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z"/><path d="M12 10v5m-2.5-2.5h5"/>'
    }[name]||'';
    return P+d+'</svg>';
  }

  function insertHero(){
    if(!isHome() || document.getElementById('vz-homepage-hero-auto')) return;
    var target = document.querySelector('.content') || document.querySelector('.content-wrapper') || document.querySelector('main') || document.body;
    if(!target) return;
    var wrap = document.createElement('div');
    wrap.id = 'vz-homepage-hero-auto';
    wrap.className = 'vz-brand-hero';
    wrap.innerHTML =
      '<div class="vz-brand-hero__text">'+
        '<span class="vz-brand-hero__label">'+ico('paw')+'Pro psy a kočky</span>'+
        '<h2>Méně chlupů doma.<br>Víc pohody s&nbsp;mazlíčkem.</h2>'+
        '<p>Kartáče, péče a chytré vychytávky, které opravdu fungují. Vybíráme je kus po kusu a skladové zboží odesíláme do 24 hodin.</p>'+
        '<div class="vz-brand-hero__cta">'+
          '<a href="/doporucujeme/" class="vz-brand-hero__btn">Nejprodávanější</a>'+
          '<a href="/proti-linani/" class="vz-brand-hero__btn vz-brand-hero__btn--ghost">Proti línání</a>'+
        '</div>'+
        '<ul class="vz-brand-hero__trust">'+
          '<li>'+ico('truck')+'Doprava zdarma od 1 499 Kč</li>'+
          '<li>'+ico('bolt')+'Odeslání do 24 hodin</li>'+
          '<li>'+ico('undo')+'14 dní na vrácení</li>'+
        '</ul>'+
      '</div>'+
      '<nav class="vz-brand-hero__cards" aria-label="Nejoblíbenější kategorie">'+
        '<a href="/proti-linani/"><i>'+ico('brush')+'</i><span><strong>Proti línání</strong><small>Kartáče a hřebeny na chlupy</small></span></a>'+
        '<a href="/chytre-vychytavky/"><i>'+ico('spark')+'</i><span><strong>Chytré vychytávky</strong><small>Fontánky, krmítka, toalety</small></span></a>'+
        '<a href="/lekarna-pro-mazlicky/"><i>'+ico('heart')+'</i><span><strong>Lékárna pro mazlíčky</strong><small>Klíšťata, klouby, kůže a srst</small></span></a>'+
      '</nav>'+
      '<div class="vz-brand-hero__logos" aria-label="Značky v nabídce">'+
        '<a href="/vyhledavani/?string=Bamboo%20Groom" class="vz-brand-hero__logo vz-brand-hero__logo--bamboo"><strong>Bamboo Groom</strong><span>Kartáče, hřebeny a péče o srst</span></a>'+
        '<a href="/vyhledavani/?string=Flamingo" class="vz-brand-hero__logo vz-brand-hero__logo--flamingo"><strong>Flamingo</strong><span>Hračky, hygiena a vybavení</span></a>'+
        '<a href="/vyhledavani/?string=Designed%20by%20Lotte" class="vz-brand-hero__logo vz-brand-hero__logo--lotte"><strong>Designed by Lotte</strong><span>Stylové doplňky a pelíšky</span></a>'+
      '</div>';
    target.insertBefore(wrap, target.firstChild);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertHero); else insertHero();
  window.addEventListener('load', insertHero);
  setTimeout(insertHero, 500);
})();
