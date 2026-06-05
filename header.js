(function(){
  var NEW_SHIPPING='Doprava zdarma od 1499 Kč';
  var OLD_SHIPPING='Doprava zdarma od '+(1000-1)+' Kč';
  var COUPON='CHLU'+'PY10';
  var FIRST_ORDER='první'+' objednávku';
  var GIFT=String.fromCodePoint(0x1f381);

  function removeNode(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}
  function norm(v){return(v||'').toString().replace(/\s+/g,' ').trim().toLowerCase()}
  function isProtiLinaniPage(){return window.location.pathname.replace(/\/+$/,'')==='/proti-linani'}
  function isPromoProductsHeading(t){return t==='nejprodávanější'||t==='nejprodavanejsi'||t==='doporučujeme'||t==='doporucujeme'}

  function insertHeaderStyle(){
    if(document.getElementById('vz-header-featured-style'))return;
    var css='.vz-social-links{display:flex;align-items:center;justify-content:center;gap:10px}.vz-social-links a{display:inline-flex;align-items:center;justify-content:center;width:25px;height:25px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff!important;text-decoration:none!important;font-weight:950;line-height:1}.vz-menu-main{grid-template-columns:repeat(6,minmax(0,1fr))!important}.vz-menu-featured{grid-template-columns:repeat(3,minmax(0,1fr))!important;margin-top:9px!important;background:rgba(234,223,207,.72)!important}.vz-menu-featured a{min-height:56px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;padding:8px 12px!important;line-height:1!important}.vz-menu-featured a span{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;min-width:30px;border-radius:999px;background:#fff;box-shadow:0 6px 14px rgba(0,0,0,.1);font-size:16px}.vz-menu-featured a b,.vz-menu-featured a small{display:block}.vz-menu-featured a b{font-size:13px;font-weight:950;letter-spacing:.03em}.vz-menu-featured a small{font-size:10.5px;font-weight:900;opacity:.9;margin-top:2px}.vz-menu-featured .pharm,.vz-menu-main .mob-pharm{background:linear-gradient(135deg,#e4f6e8,#c5e6cf)!important;color:#1f5a3d!important;border-color:#78b889!important}.vz-menu-featured .smart{background:linear-gradient(135deg,#fff1c8,#f2cd6d)!important;color:#5c3c08!important;border-color:#d6a34a!important}.vz-menu-featured .travel{background:linear-gradient(135deg,#e6eefc,#cbdcf7)!important;color:#25456f!important;border-color:#8aa9d8!important}.vz-menu-main .mob-pharm{display:none!important}.vz-menu-featured a:hover,.vz-menu-featured a.is-active,.vz-menu-main .mob-pharm:hover,.vz-menu-main .mob-pharm.is-active{background:var(--vz-g)!important;color:#fff!important;border-color:var(--vz-g)!important}@media(max-width:1100px){.vz-menu-main{grid-template-columns:repeat(3,1fr)!important}.vz-menu-featured{grid-template-columns:1fr!important}.vz-menu-featured a{min-height:48px!important}}@media(max-width:768px){.vz-menu-main{grid-template-columns:1fr 1fr!important}.vz-menu-main .mob-pharm{display:flex!important}.vz-menu-featured{grid-template-columns:1fr!important}.vz-menu-featured .pharm{display:none!important}.vz-menu-featured a{min-height:46px!important}.vz-menu-featured a b{font-size:12px}.vz-menu-featured a small{font-size:10px}.vz-menu-main .cat,.vz-menu-main .mob-pharm{grid-column:auto!important}.vz-menu-main .key,.vz-menu-main .toi,.vz-menu-main .hot{grid-column:1/3!important}}';
    var s=document.createElement('style');s.id='vz-header-featured-style';s.textContent=css;document.head.appendChild(s);
  }

  function loadBrandLogoFix(){
    if(document.getElementById('vz-brand-logo-fix-css'))return;
    var l=document.createElement('link');
    l.id='vz-brand-logo-fix-css';
    l.rel='stylesheet';
    l.href='https://cdn.jsdelivr.net/gh/zukysevents-dot/vycesano-shoptet@main/brand-logo-fix.css?v=20260605b';
    document.head.appendChild(l);
  }

  function insertHeroBrandSpotlightStyle(){
    if(!document.getElementById('vz-brand-spotlight-style')){
      var css='.vz-brand-hero__spotlight-logos{position:absolute!important;top:76px!important;right:34px!important;width:238px!important;display:grid!important;grid-template-columns:1fr!important;gap:12px!important;z-index:4!important}.vz-brand-hero__spotlight-logo{min-height:72px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:9px 15px!important;overflow:hidden!important;border:1px solid rgba(33,91,64,.14)!important;border-radius:16px!important;background:rgba(255,255,255,.94)!important;box-shadow:0 12px 28px rgba(24,55,40,.13)!important;text-decoration:none!important;transition:transform .18s ease,box-shadow .18s ease!important}.vz-brand-hero__spotlight-logo:hover{transform:translateY(-2px)!important;box-shadow:0 16px 34px rgba(24,55,40,.2)!important}.vz-brand-hero__spotlight-logo img{display:block!important;width:100%!important;max-width:196px!important;height:50px!important;object-fit:contain!important}.vz-brand-hero__spotlight-logo--petsafe{background:#123f76!important;border-color:#123f76!important}.vz-brand-hero__spotlight-logo--petsafe img{max-width:174px!important;height:54px!important}.vz-brand-hero__spotlight-logo--animology{background:#191614!important;border-color:#191614!important}.vz-brand-hero__spotlight-logo--animology img{max-width:190px!important;height:50px!important}@media(max-width:1120px){.vz-brand-hero__spotlight-logos{position:relative!important;top:auto!important;right:auto!important;width:auto!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important;margin:20px 0 0!important}.vz-brand-hero__spotlight-logo{min-height:66px!important;padding:8px 12px!important}.vz-brand-hero__spotlight-logo img{max-width:180px!important;height:46px!important}.vz-brand-hero__spotlight-logo--petsafe img{max-width:154px!important;height:48px!important}.vz-brand-hero__spotlight-logo--animology img{max-width:170px!important;height:46px!important}}@media(max-width:600px){.vz-brand-hero__spotlight-logos{grid-template-columns:1fr!important;gap:8px!important;margin-top:16px!important}.vz-brand-hero__spotlight-logo{min-height:58px!important}.vz-brand-hero__spotlight-logo img,.vz-brand-hero__spotlight-logo--petsafe img,.vz-brand-hero__spotlight-logo--animology img{height:42px!important;max-width:180px!important}}';
      var s=document.createElement('style');s.id='vz-brand-spotlight-style';s.textContent=css;document.head.appendChild(s);
    }
    loadBrandLogoFix();
  }

  function insertHeroBrandSpotlight(){
    var hero=document.querySelector('.vz-brand-hero');
    if(!hero||document.getElementById('vz-brand-spotlight-logos'))return;
    insertHeroBrandSpotlightStyle();
    var logos=
      '<div id="vz-brand-spotlight-logos" class="vz-brand-hero__spotlight-logos" aria-label="Další oblíbené značky">'+
        '<a class="vz-brand-hero__spotlight-logo" href="/vyhledavani/?string=Beeztees" aria-label="Zobrazit produkty Beeztees"><img src="https://cdn.jsdelivr.net/gh/zukysevents-dot/vycesano-shoptet@main/assets/brands/beeztees.jpg?v=20260605" alt="Beeztees" loading="lazy"></a>'+
        '<a class="vz-brand-hero__spotlight-logo vz-brand-hero__spotlight-logo--petsafe" href="/vyhledavani/?string=PetSafe" aria-label="Zobrazit produkty PetSafe"><img src="https://cdn.jsdelivr.net/gh/zukysevents-dot/vycesano-shoptet@main/assets/brands/petsafe.jpg?v=20260605" alt="PetSafe" loading="lazy"></a>'+
        '<a class="vz-brand-hero__spotlight-logo vz-brand-hero__spotlight-logo--animology" href="/vyhledavani/?string=Animology" aria-label="Zobrazit produkty Animology"><img src="https://cdn.jsdelivr.net/gh/zukysevents-dot/vycesano-shoptet@main/assets/brands/animology.jpg?v=20260605" alt="Animology" loading="lazy"></a>'+
      '</div>';
    var currentLogos=hero.querySelector('.vz-brand-hero__logos');
    if(currentLogos)currentLogos.insertAdjacentHTML('beforebegin',logos);else hero.insertAdjacentHTML('beforeend',logos);
  }

  function hideProtiLinaniPromoProducts(){
    if(!isProtiLinaniPage()||!document.body)return;
    var hs=[].slice.call(document.querySelectorAll('h1,h2,h3,h4'));
    var start=null,stop=null;
    hs.forEach(function(h){var t=norm(h.textContent);if(!start&&isPromoProductsHeading(t))start=h;if(!stop&&(t==='řazení produktů'||t==='razení produktů'||t==='výpis produktů'))stop=h});
    if(!start)return;
    var n=start,i=0;
    while(n&&n!==stop&&i<60){var next=n.nextElementSibling;removeNode(n);n=next;i++}
  }

  function cleanupLegacyTexts(root){
    root=root||document.body;if(!root)return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(function(node){
      var v=node.nodeValue||'',o=v;
      v=v.split(OLD_SHIPPING+'.').join(NEW_SHIPPING+'.').split(OLD_SHIPPING).join(NEW_SHIPPING);
      v=v.split('BESTSELLERY').join('DOPORUČUJEME').split('Bestsellery').join('Doporučujeme').split('bestsellery').join('doporučujeme');
      [GIFT+' '+'10'+' % na '+FIRST_ORDER+': '+COUPON,'10'+' % na '+FIRST_ORDER+': '+COUPON,'sleva na '+FIRST_ORDER,COUPON,FIRST_ORDER].forEach(function(t){v=v.split(t).join('')});
      if(v!==o)node.nodeValue=v.replace(/\s{2,}/g,' ').trim();
    });
    document.querySelectorAll('.vz-top__inner>div').forEach(function(item){var t=(item.textContent||'').trim();if(!t||t.indexOf(COUPON)!==-1||t.indexOf(FIRST_ORDER)!==-1)removeNode(item)});
  }

  function insertHeader(){
    if(!document.body)return;
    insertHeaderStyle();cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();removeNode(document.getElementById('vz-custom-header'));
    var header=
      '<div id="vz-custom-header">'+
        '<div class="vz-top"><div class="vz-top__inner">'+
          '<div>🚚 Doprava zdarma od 1499 Kč</div><div>⚡ Odeslání do 24 hodin</div><div>↩️ Vrácení do 14 dnů</div><div>🐶 Pro psy a kočky skladem</div><div>📞 <a href="tel:774318382">774 318 382</a></div>'+
          '<div class="vz-social-links"><a href="https://www.facebook.com/profile.php?id=61589413723529" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a><a href="https://www.instagram.com/vycesano.cz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a></div>'+
        '</div></div>'+
        '<div class="vz-header"><div class="vz-header__box">'+
          '<div class="vz-header__main">'+
            '<a href="/" class="vz-logo"><img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz"><div>Vyčesáno<span>.cz</span></div></a>'+
            '<form action="/vyhledavani/" method="get" class="vz-search"><input type="text" name="string" placeholder="Hledejte škrabadla, kartáče, obojky..."><button type="submit">HLEDAT</button></form>'+
            '<a href="/kosik/" class="vz-cart" aria-label="Košík">🛒</a>'+
          '</div>'+
          '<nav class="vz-menu vz-menu-main" aria-label="Hlavní kategorie">'+
            '<a href="/pro-psy/">🐶 PRO PSY</a><a href="/pro-kocky/">🐱 PRO KOČKY</a><a href="/proti-linani/" class="key">🧴 PROTI LÍNÁNÍ</a><a href="/doporucujeme/" class="toi">⭐ DOPORUČUJEME</a><a href="/skrabadla/" class="cat">🪵 ŠKRABADLA</a><a href="/lekarna-pro-mazlicky/" class="mob-pharm">💚 LÉKÁRNA</a><a href="/letni-kolekce/" class="hot">☀️ LETNÍ KOLEKCE</a>'+
          '</nav>'+
          '<nav class="vz-menu vz-menu-featured" aria-label="Speciální kategorie">'+
            '<a href="/lekarna-pro-mazlicky/" class="pharm"><span>💚</span><div><b>LÉKÁRNA</b><small>PRO MAZLÍČKY</small></div></a>'+
            '<a href="/chytre-vychytavky/" class="smart"><span>💡</span><div><b>CHYTRÉ</b><small>VYCHYTÁVKY</small></div></a>'+
            '<a href="/cestovani/" class="travel"><span>🚗</span><div><b>CESTOVÁNÍ</b><small>JIŽ BRZY</small></div></a>'+
          '</nav>'+
        '</div></div>'+
      '</div>';
    document.body.insertAdjacentHTML('afterbegin',header);
    var path=window.location.pathname.replace(/\/$/,'')+'/';
    document.querySelectorAll('.vz-menu a').forEach(function(a){var h=a.getAttribute('href');if(h&&h!=='/'&&path.indexOf(h)===0){a.classList.add('is-active');a.setAttribute('aria-current','page')}});
    cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();
  }

  function scheduleCleanup(){
    loadBrandLogoFix();cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();insertHeroBrandSpotlight();
    setTimeout(function(){loadBrandLogoFix();cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();insertHeroBrandSpotlight()},250);
    setTimeout(function(){loadBrandLogoFix();cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();insertHeroBrandSpotlight()},1200);
    if(window.MutationObserver&&document.body){var ob=new MutationObserver(function(){loadBrandLogoFix();cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();insertHeroBrandSpotlight()});ob.observe(document.body,{childList:true,subtree:true,characterData:true});setTimeout(function(){ob.disconnect()},6000)}
  }
  function init(){loadBrandLogoFix();insertHeroBrandSpotlightStyle();insertHeader();scheduleCleanup()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',scheduleCleanup);
})();
