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
    cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();removeNode(document.getElementById('vz-custom-header'));
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
            '<a href="/pro-psy/">🐶 PRO PSY</a><a href="/pro-kocky/">🐱 PRO KOČKY</a><a href="/proti-linani/" class="key">🧴 PROTI LÍNÁNÍ</a><a href="/doporucujeme/" class="toi">⭐ DOPORUČUJEME</a><a href="/skrabadla/" class="cat">🪵 ŠKRABADLA</a><a href="/letni-kolekce/" class="hot">☀️ LETNÍ KOLEKCE</a>'+
          '</nav>'+
          '<nav class="vz-menu vz-menu-featured" aria-label="Speciální kategorie">'+
            '<a href="/lekarna-pro-mazlicky/" class="pharm"><span>💚</span><b>LÉKÁRNA</b><small>PRO MAZLÍČKY</small></a>'+
            '<a href="/chytre-vychytavky/" class="smart"><span>💡</span><b>CHYTRÉ</b><small>VYCHYTÁVKY</small></a>'+
            '<a href="/cestovani/" class="travel"><span>🚗</span><b>CESTOVÁNÍ</b><small>JIŽ BRZY</small></a>'+
          '</nav>'+
        '</div></div>'+
      '</div>';
    document.body.insertAdjacentHTML('afterbegin',header);
    var path=window.location.pathname.replace(/\/$/,'')+'/';
    document.querySelectorAll('.vz-menu a').forEach(function(a){var h=a.getAttribute('href');if(h&&h!=='/'&&path.indexOf(h)===0){a.classList.add('is-active');a.setAttribute('aria-current','page')}});
    cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();
  }

  function scheduleCleanup(){
    cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts();
    setTimeout(function(){cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts()},250);
    setTimeout(function(){cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts()},1200);
    if(window.MutationObserver&&document.body){var ob=new MutationObserver(function(){cleanupLegacyTexts(document.body);hideProtiLinaniPromoProducts()});ob.observe(document.body,{childList:true,subtree:true,characterData:true});setTimeout(function(){ob.disconnect()},6000)}
  }
  function init(){insertHeader();scheduleCleanup()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',scheduleCleanup);
})();