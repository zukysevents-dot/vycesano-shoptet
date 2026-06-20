/* ============================================================
   Vyčesáno.cz – hero assets (přímé URL, bez 404 probingu)
   Nahrazuje původní hero-pet-fast-v2.js + logo-image-loader.js,
   které zkoušely desítky variant cest (záplava 404). Tady jsou
   ověřené, existující URL napevno – stejný výsledek, nula 404.
   ============================================================ */
(function(){
  function isHome(){
    var p = location.pathname.replace(/\/+$/,'');
    return p === '' || p === '/';
  }

  /* --- Hero pozadí (pes + kočka) --- */
  var HERO_BG = '/user/documents/upload/pes-kocka-hero.png?v=22';

  function addHeroBg(){
    if(document.getElementById('vz-pet-bg-fast-v2')) return;
    var s = document.createElement('style');
    s.id = 'vz-pet-bg-fast-v2';
    s.textContent = '.vz-brand-hero:before{content:""!important;position:absolute!important;right:-45px!important;top:-48px!important;width:900px!important;max-width:60%!important;height:570px!important;z-index:1!important;opacity:.95!important;pointer-events:none!important;background-image:linear-gradient(90deg,rgba(248,244,236,.98) 0%,rgba(248,244,236,.74) 28%,rgba(248,244,236,.10) 64%),url("'+HERO_BG+'")!important;background-repeat:no-repeat!important;background-position:top right!important;background-size:contain!important;filter:none!important}.vz-brand-hero__text,.vz-brand-hero__logos{position:relative!important;z-index:3!important}@media(max-width:1200px){.vz-brand-hero:before{right:-105px!important;top:-28px!important;width:760px!important;max-width:72%!important;height:510px!important;opacity:.54!important;background-image:linear-gradient(90deg,rgba(248,244,236,.98) 0%,rgba(248,244,236,.78) 34%,rgba(248,244,236,.18) 70%),url("'+HERO_BG+'")!important}}@media(max-width:768px){.vz-brand-hero:before{right:-235px!important;top:8px!important;width:560px!important;max-width:none!important;height:410px!important;opacity:.34!important;background-position:top right!important;background-image:linear-gradient(90deg,rgba(248,244,236,.99) 0%,rgba(248,244,236,.86) 44%,rgba(248,244,236,.30) 78%),url("'+HERO_BG+'")!important}}@media(max-width:480px){.vz-brand-hero:before{right:-240px!important;top:2px!important;width:545px!important;height:400px!important;opacity:.36!important}}';
    document.head.appendChild(s);
  }

  /* --- Loga značek (přímé URL existujících obrázků) --- */
  var LOGOS = [
    {sel:'.vz-brand-hero__logo--bamboo',   url:'/user/documents/upload/IMG_3982.jpg', alt:'Bamboo Groom'},
    {sel:'.vz-brand-hero__logo--flamingo', url:'/user/documents/upload/IMG_3981.png', alt:'Flamingo Pet Products'},
    {sel:'.vz-brand-hero__logo--lotte',    url:'/user/documents/upload/IMG_3984.jpg', alt:'Designed by Lotte'}
  ];

  function addLogoStyle(){
    if(document.getElementById('vz-logo-image-loader-style')) return;
    var s = document.createElement('style');
    s.id = 'vz-logo-image-loader-style';
    s.textContent = [
      '.vz-brand-hero__logo.has-real-logo:before{display:none!important;content:none!important;background-image:none!important}',
      '.vz-brand-hero__logo.has-real-logo{gap:8px!important}',
      '.vz-brand-logo-img{display:block!important;width:100%!important;height:64px!important;max-width:250px!important;object-fit:contain!important;margin:0 auto 8px!important}',
      '.vz-brand-hero__logo--bamboo .vz-brand-logo-img{height:70px!important;max-width:285px!important}',
      '.vz-brand-hero__logo--flamingo .vz-brand-logo-img{height:58px!important;max-width:230px!important}',
      '.vz-brand-hero__logo--lotte .vz-brand-logo-img{height:70px!important;max-width:180px!important}',
      '@media(max-width:768px){.vz-brand-logo-img{height:56px!important}.vz-brand-hero__logo--bamboo .vz-brand-logo-img{height:62px!important}.vz-brand-hero__logo--flamingo .vz-brand-logo-img{height:52px!important}.vz-brand-hero__logo--lotte .vz-brand-logo-img{height:62px!important}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function putLogo(item){
    var card = document.querySelector(item.sel);
    if(!card || card.classList.contains('has-real-logo')) return;
    var img = document.createElement('img');
    img.className = 'vz-brand-logo-img';
    img.alt = item.alt;
    img.loading = 'eager';
    img.decoding = 'async';
    img.src = item.url + '?v=2';
    var span = card.querySelector('span');
    card.insertBefore(img, span || card.firstChild);
    card.classList.add('has-real-logo');
  }

  function run(){
    if(!isHome()) return;
    addHeroBg();
    addLogoStyle();
    LOGOS.forEach(putLogo);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
  setTimeout(run, 400);
})();
