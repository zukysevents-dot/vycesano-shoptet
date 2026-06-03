(function(){
  var NEW_SHIPPING = 'Doprava zdarma od 1499 Kč';
  var OLD_SHIPPING = 'Doprava zdarma od ' + (1000 - 1) + ' Kč';
  var COUPON = 'CHLU' + 'PY10';
  var FIRST_ORDER = 'první' + ' objednávku';
  var GIFT = String.fromCodePoint(0x1f381);

  function removeNode(el){
    if(el && el.parentNode) el.parentNode.removeChild(el);
  }

  function normalizeText(value){
    return (value || '')
      .toString()
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function isProtiLinaniPage(){
    return window.location.pathname.replace(/\/+$/, '') === '/proti-linani';
  }

  function isPromoProductsHeading(text){
    return text === 'nejprodávanější' || text === 'nejprodavanejsi' || text === 'doporučujeme' || text === 'doporucujeme';
  }

  function hideProtiLinaniPromoProducts(){
    if(!isProtiLinaniPage() || !document.body) return;

    var headings = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4'));
    var promoHeading = null;
    var stopHeading = null;

    headings.forEach(function(heading){
      var text = normalizeText(heading.textContent);
      if(!promoHeading && isPromoProductsHeading(text)) promoHeading = heading;
      if(!stopHeading && (text === 'řazení produktů' || text === 'razení produktů' || text === 'výpis produktů')) stopHeading = heading;
    });

    if(!promoHeading) return;

    var node = promoHeading;
    var safetyCounter = 0;

    while(node && node !== stopHeading && safetyCounter < 60){
      var next = node.nextElementSibling;
      removeNode(node);
      node = next;
      safetyCounter += 1;
    }
  }

  function cleanupLegacyTexts(root){
    root = root || document.body;
    if(!root) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function(node){
      var value = node.nodeValue || '';
      var original = value;
      value = value.split(OLD_SHIPPING + '.').join(NEW_SHIPPING + '.');
      value = value.split(OLD_SHIPPING).join(NEW_SHIPPING);
      value = value.split('BESTSELLERY').join('DOPORUČUJEME');
      value = value.split('Bestsellery').join('Doporučujeme');
      value = value.split('bestsellery').join('doporučujeme');

      var blocked = [
        GIFT + ' ' + '10' + ' % na ' + FIRST_ORDER + ': ' + COUPON,
        '10' + ' % na ' + FIRST_ORDER + ': ' + COUPON,
        'sleva na ' + FIRST_ORDER,
        COUPON,
        FIRST_ORDER
      ];

      blocked.forEach(function(text){
        value = value.split(text).join('');
      });

      if(value !== original) node.nodeValue = value.replace(/\s{2,}/g, ' ').trim();
    });

    document.querySelectorAll('.vz-top__inner > div').forEach(function(item){
      var text = (item.textContent || '').trim();
      if(!text || text.indexOf(COUPON) !== -1 || text.indexOf(FIRST_ORDER) !== -1){
        removeNode(item);
      }
    });
  }

  function insertHeader(){
    if(!document.body) return;

    cleanupLegacyTexts(document.body);
    hideProtiLinaniPromoProducts();
    removeNode(document.getElementById('vz-custom-header'));

    var header =
      '<div id="vz-custom-header">'+
        '<div class="vz-top"><div class="vz-top__inner">'+
          '<div>🚚 Doprava zdarma od 1499 Kč</div>'+
          '<div>⚡ Odeslání do 24 hodin</div>'+
          '<div>↩️ Vrácení do 14 dnů</div>'+
          '<div>🐶 Pro psy a kočky skladem</div>'+
          '<div>📞 <a href="tel:774318382">774 318 382</a></div>'+
          '<div class="vz-social-links" style="display:flex;align-items:center;justify-content:center;gap:10px;">'+
            '<a href="https://www.facebook.com/profile.php?id=61589413723529" target="_blank" rel="noopener noreferrer" aria-label="Vyčesáno.cz Facebook" style="display:inline-flex;align-items:center;justify-content:center;width:25px;height:25px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;text-decoration:none;line-height:1;">'+
              '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="display:block;width:15px;height:15px;"><path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>'+
            '</a>'+
            '<a href="https://www.instagram.com/vycesano.cz/" target="_blank" rel="noopener noreferrer" aria-label="Vyčesáno.cz Instagram" style="display:inline-flex;align-items:center;justify-content:center;width:25px;height:25px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;text-decoration:none;line-height:1;">'+
              '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="display:block;width:15px;height:15px;"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z"/></svg>'+
            '</a>'+
          '</div>'+
        '</div></div>'+
        '<div class="vz-header"><div class="vz-header__box">'+
          '<div class="vz-header__main">'+
            '<a href="/" class="vz-logo"><img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz"><div>Vyčesáno<span>.cz</span></div></a>'+
            '<form action="/vyhledavani/" method="get" class="vz-search"><input type="text" name="string" placeholder="Hledejte škrabadla, kartáče, obojky..."><button type="submit">HLEDAT</button></form>'+
            '<a href="/kosik/" class="vz-cart" aria-label="Košík">🛒</a>'+
          '</div>'+
          '<nav class="vz-menu" aria-label="Hlavní kategorie">'+
            '<a href="/pro-psy/">🐶 PRO PSY</a>'+
            '<a href="/pro-kocky/">🐱 PRO KOČKY</a>'+
            '<a href="/proti-linani/" class="key">🧴 PROTI LÍNÁNÍ</a>'+
            '<a href="/doporucujeme/" class="toi">⭐ DOPORUČUJEME</a>'+
            '<a href="/skrabadla/" class="cat">🪵 ŠKRABADLA</a>'+
            '<a href="/fontanky/" class="wat">💧 FONTÁNKY</a>'+
            '<a href="/letni-kolekce/" class="hot">☀️ LETNÍ KOLEKCE</a>'+
          '</nav>'+
        '</div></div>'+
      '</div>';

    document.body.insertAdjacentHTML('afterbegin', header);

    var path = window.location.pathname.replace(/\/$/,'') + '/';
    document.querySelectorAll('.vz-menu a').forEach(function(link){
      var href = link.getAttribute('href');
      if(href && href !== '/' && path.indexOf(href) === 0){
        link.classList.add('is-active');
        link.setAttribute('aria-current','page');
      }
    });

    cleanupLegacyTexts(document.body);
    hideProtiLinaniPromoProducts();
  }

  function scheduleCleanup(){
    cleanupLegacyTexts(document.body);
    hideProtiLinaniPromoProducts();
    setTimeout(function(){ cleanupLegacyTexts(document.body); hideProtiLinaniPromoProducts(); }, 250);
    setTimeout(function(){ cleanupLegacyTexts(document.body); hideProtiLinaniPromoProducts(); }, 1200);

    if(window.MutationObserver && document.body){
      var observer = new MutationObserver(function(){
        cleanupLegacyTexts(document.body);
        hideProtiLinaniPromoProducts();
      });
      observer.observe(document.body, {childList:true, subtree:true, characterData:true});
      setTimeout(function(){ observer.disconnect(); }, 6000);
    }
  }

  function init(){
    insertHeader();
    scheduleCleanup();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
  window.addEventListener('load', scheduleCleanup);
})();