/* ============================================================
   Vyčesáno.cz – hero assets (přímé URL, bez 404 probingu)
   1) foto pes+kočka jako pozadí hero (:before)
   2) reálná loga značek do spodního pásu hero
   Ověřené existující URL napevno – žádné 404.
   ============================================================ */
(function(){
  function isHome(){
    var p = location.pathname.replace(/\/+$/,'');
    if(p === '' || p === '/') return true;
    var b = document.body;
    return !!(b && (b.classList.contains('type-index') || b.classList.contains('in-index')));
  }

  /* --- Hero pozadí (pes + kočka) --- */
  var HERO_BG = '/user/documents/upload/pes-kocka-hero.png?v=22';

  function addHeroBg(){
    if(document.getElementById('vz-pet-bg-fast-v2')) return;
    var s = document.createElement('style');
    s.id = 'vz-pet-bg-fast-v2';
    s.textContent = '.vz-brand-hero:before{content:""!important;position:absolute!important;right:330px!important;top:-40px!important;width:760px!important;max-width:52%!important;height:540px!important;z-index:1!important;opacity:.9!important;pointer-events:none!important;background-image:linear-gradient(90deg,rgba(247,242,232,.99) 0%,rgba(247,242,232,.72) 30%,rgba(247,242,232,.12) 66%),url("'+HERO_BG+'")!important;background-repeat:no-repeat!important;background-position:top right!important;background-size:contain!important}'+
    '@media(max-width:1500px){.vz-brand-hero:before{right:300px!important;max-width:46%!important}}'+
    '@media(max-width:1200px){.vz-brand-hero:before{right:230px!important;top:-20px!important;width:640px!important;max-width:52%!important;height:480px!important;opacity:.5!important}}'+
    '@media(max-width:1100px){.vz-brand-hero:before{right:-60px!important;top:0!important;opacity:.32!important}}'+
    '@media(max-width:768px){.vz-brand-hero:before{right:-210px!important;top:8px!important;width:540px!important;max-width:none!important;height:400px!important;opacity:.24!important}}';
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
      '.vz-brand-logo-img{display:block!important;width:100%!important;height:52px!important;max-width:210px!important;object-fit:contain!important;margin:0 auto!important}',
      '.vz-brand-hero__logo--bamboo .vz-brand-logo-img{height:56px!important;max-width:240px!important}',
      '.vz-brand-hero__logo--lotte .vz-brand-logo-img{height:56px!important;max-width:150px!important}',
      '@media(max-width:768px){.vz-brand-logo-img{height:46px!important}}'
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
    /* při 404 zůstane textový fallback (strong v kartě) */
    img.onerror = function(){
      if(img.parentNode) img.parentNode.removeChild(img);
      card.classList.remove('has-real-logo');
    };
    img.src = item.url + '?v=2';
    var span = card.querySelector('span');
    card.insertBefore(img, span || card.firstChild);
    card.classList.add('has-real-logo');
  }

  function run(){
    if(!isHome()) return;
    if(!document.querySelector('.vz-brand-hero')) return;
    addHeroBg();
    addLogoStyle();
    LOGOS.forEach(putLogo);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
  setTimeout(run, 400);
})();
