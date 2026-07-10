/* ============================================================
   Vyčesáno.cz – vlastní hlavička (top bar, logo, hledání, menu)
   + úklid zastaralých textů ze Shoptet obsahu.
   Bez emoji – inline SVG ikony (currentColor).
   ============================================================ */
(function(){
  /* Kompat: starý admin kód nenastavuje html.vz-ready (dělá to inline
     skript v novém head kódu) – nastav ji i odsud, ať skrytí nativní
     hlavičky funguje během přechodu na nové admin kódy. Idempotentní. */
  document.documentElement.classList.add('vz-ready');

  var NEW_SHIPPING='Doprava zdarma od 1 499 Kč';
  var OLD_SHIPPING='Doprava zdarma od '+(1000-1)+' Kč';
  var OLD_SHIPPING_2='Doprava zdarma od 1499 Kč';
  var COUPON='CHLU'+'PY10';
  var FIRST_ORDER='první'+' objednávku';
  var GIFT=String.fromCodePoint(0x1f381);

  /* --- SVG ikony (stroke 1.8, currentColor) --- */
  function ico(name){
    var P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var d={
      truck:'<path d="M1 5h13v11H1zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
      bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
      undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
      phone:'<path d="M22 16.9v2.5a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.7 2 2 0 0 1 4.1 1.5h2.5a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L7.8 9.15a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.75 2.05z"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
      cart:'<circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22.5 7H6"/>',
      paw:'<circle cx="7" cy="8.5" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="8.5" r="1.8"/><path d="M12 11.5c-2.6 0-5.5 2.5-5.5 5 0 1.4 1.1 2.5 2.5 2.5 1.1 0 2-.5 3-.5s1.9.5 3 .5c1.4 0 2.5-1.1 2.5-2.5 0-2.5-2.9-5-5.5-5z"/>'
    }[name]||'';
    return P+d+'</svg>';
  }
  function icoFb(){return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.84.23-1.4 1.44-1.4h1.53V5.2c-.26-.04-1.17-.11-2.23-.11-2.2 0-3.71 1.34-3.71 3.8v2.13H8.1V14h2.43v7h2.97z"/></svg>';}
  function icoIg(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none"/></svg>';}

  function removeNode(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}
  function norm(v){return(v||'').toString().replace(/\s+/g,' ').trim().toLowerCase()}
  function isProtiLinaniPage(){return window.location.pathname.replace(/\/+$/,'')==='/proti-linani'}
  function isPromoProductsHeading(t){return t==='nejprodávanější'||t==='nejprodavanejsi'||t==='doporučujeme'||t==='doporucujeme'}

  /* Na /proti-linani schovat duplicitní promo výpis nad kategorií.
     Cílí přímo na Shoptet wrapper (.products-top-wrapper) a maže ho
     jen když jeho nadpis odpovídá promo bloku – žádné procházení
     sourozenců (dřív hrozilo smazání až 60 elementů výpisu). */
  function hideProtiLinaniPromoProducts(){
    if(!isProtiLinaniPage()||!document.body)return;
    [].slice.call(document.querySelectorAll('.products-top-wrapper')).forEach(function(w){
      var h=w.querySelector('h1,h2,h3,h4');
      if(h&&isPromoProductsHeading(norm(h.textContent)))removeNode(w);
    });
  }

  /* Přepis zastaralých textů (starý práh dopravy, kupón).
     TreeWalker + zápis jen při reálné změně. */
  function cleanupLegacyTexts(root){
    root=root||document.body;if(!root)return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(function(node){
      var v=node.nodeValue||'',o=v;
      if(v.indexOf(OLD_SHIPPING)===-1&&v.indexOf(OLD_SHIPPING_2)===-1&&v.indexOf(COUPON)===-1&&v.indexOf('sleva na '+FIRST_ORDER)===-1&&!/bestsellery/i.test(v))return;
      v=v.split(OLD_SHIPPING+'.').join(NEW_SHIPPING+'.').split(OLD_SHIPPING).join(NEW_SHIPPING).split(OLD_SHIPPING_2).join(NEW_SHIPPING);
      v=v.split('BESTSELLERY').join('DOPORUČUJEME').split('Bestsellery').join('Doporučujeme').split('bestsellery').join('doporučujeme');
      /* mazat jen celé promo věty + mrtvý kupón – NE samotné 'první objednávku'
         (to se může legitimně objevit v popisu produktu nebo článku) */
      [GIFT+' '+'10'+' % na '+FIRST_ORDER+': '+COUPON,'10'+' % na '+FIRST_ORDER+': '+COUPON,'sleva na '+FIRST_ORDER,COUPON].forEach(function(t){v=v.split(t).join('')});
      if(v!==o)node.nodeValue=v.replace(/\s{2,}/g,' ').trim();
    });
  }

  function insertHeader(){
    if(!document.body||document.getElementById('vz-custom-header'))return;
    var header=
      '<div id="vz-custom-header">'+
        '<div class="vz-top"><div class="vz-top__inner">'+
          '<div>'+ico('truck')+'Doprava zdarma od 1 499 Kč</div>'+
          '<div>'+ico('bolt')+'Odeslání do 24 hodin</div>'+
          '<div>'+ico('undo')+'Vrácení do 14 dnů</div>'+
          '<div>'+ico('phone')+'<a href="tel:774318382">774 318 382</a></div>'+
          '<div class="vz-social-links"><a href="https://www.facebook.com/profile.php?id=61589413723529" target="_blank" rel="noopener noreferrer" aria-label="Facebook">'+icoFb()+'</a><a href="https://www.instagram.com/vycesano.cz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">'+icoIg()+'</a></div>'+
        '</div></div>'+
        '<div class="vz-header"><div class="vz-header__box">'+
          '<div class="vz-header__main">'+
            '<a href="/" class="vz-logo"><img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz"><div><strong>Vyčesáno<span>.cz</span></strong><small>Péče a vychytávky pro psy a kočky</small></div></a>'+
            '<form action="/vyhledavani/" method="get" class="vz-search" role="search"><input type="text" name="string" placeholder="Hledejte kartáče, škrabadla, obojky…" aria-label="Hledat na Vyčesáno.cz"><button type="submit">'+ico('search')+'Hledat</button></form>'+
            '<a href="/kosik/" class="vz-cart">'+ico('cart')+'<b>Košík</b></a>'+
          '</div>'+
          '<nav class="vz-menu" aria-label="Hlavní kategorie">'+
            '<a href="/pro-psy/">Pro psy</a>'+
            '<a href="/pro-kocky/">Pro kočky</a>'+
            '<a href="/proti-linani/" class="key">Proti línání</a>'+
            '<a href="/skrabadla/">Škrabadla</a>'+
            '<a href="/lekarna-pro-mazlicky/">Lékárna</a>'+
            '<a href="/chytre-vychytavky/">Chytré vychytávky</a>'+
            '<a href="/letni-kolekce/">Letní kolekce</a>'+
          '</nav>'+
        '</div></div>'+
      '</div>';
    document.body.insertAdjacentHTML('afterbegin',header);
    var path=window.location.pathname.replace(/\/$/,'')+'/';
    document.querySelectorAll('.vz-menu a').forEach(function(a){
      var h=a.getAttribute('href');
      if(h&&h!=='/'&&(path===h||path.indexOf(h)===0)){a.classList.add('is-active');a.setAttribute('aria-current','page')}
    });
  }

  /* Jediný, debouncovaný observer; jen childList; konec po 6 s. */
  var observerStarted=false;
  function watchLateContent(){
    if(observerStarted||!window.MutationObserver||!document.body)return;
    observerStarted=true;
    var scheduled=false;
    var ob=new MutationObserver(function(){
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(function(){
        scheduled=false;
        cleanupLegacyTexts(document.body);
        hideProtiLinaniPromoProducts();
      });
    });
    ob.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){ob.disconnect()},6000);
  }

  function init(){
    insertHeader();
    cleanupLegacyTexts(document.body);
    hideProtiLinaniPromoProducts();
    watchLateContent();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',function(){cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts()});
})();
