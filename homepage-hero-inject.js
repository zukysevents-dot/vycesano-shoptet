(function(){
  function isHome(){
    return location.pathname.replace(/\/+$/, '') === '' || location.pathname.replace(/\/+$/, '') === '/';
  }
  function insertHero(){
    if(!isHome() || document.getElementById('vz-homepage-hero-auto')) return;
    var target = document.querySelector('.content') || document.querySelector('.content-wrapper') || document.querySelector('main') || document.body;
    if(!target) return;
    var wrap = document.createElement('div');
    wrap.id = 'vz-homepage-hero-auto';
    wrap.className = 'vz-brand-hero';
    wrap.innerHTML = '<div class="vz-brand-hero__text"><span class="vz-brand-hero__label">Značky na Vyčesáno.cz</span><h2>Pečlivě vybrané značky pro psy a kočky</h2><p>Produkty pro péči, pohodlí a čistější domácnost s mazlíčky. Objevte Bamboo Groom, Flamingo, Designed by Lotte a další značky v naší nabídce.</p><a href="/doporucujeme/" class="vz-brand-hero__btn">Zobrazit doporučené</a></div><div class="vz-brand-hero__logos"><a href="/vyhledavani/?string=Bamboo%20Groom" class="vz-brand-hero__logo vz-brand-hero__logo--bamboo"><strong>Bamboo Groom</strong><span>Kartáče, hřebeny a péče o srst</span></a><a href="/vyhledavani/?string=Flamingo" class="vz-brand-hero__logo vz-brand-hero__logo--flamingo"><strong>Flamingo</strong><span>Hračky, hygiena a vybavení pro psy i kočky</span></a><a href="/vyhledavani/?string=Designed%20by%20Lotte" class="vz-brand-hero__logo vz-brand-hero__logo--lotte"><strong>Designed by Lotte</strong><span>Stylové doplňky a pelíšky pro kočky</span></a></div>';
    target.insertBefore(wrap, target.firstChild);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertHero); else insertHero();
  window.addEventListener('load', insertHero);
  setTimeout(insertHero, 500);
})();
