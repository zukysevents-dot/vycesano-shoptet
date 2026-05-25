(function(){
  var NEW_SHIPPING = 'Doprava zdarma od 1499 Kč';
  var OLD_SHIPPING = 'Doprava zdarma od ' + (1000 - 1) + ' Kč';
  var COUPON = 'CHLU' + 'PY10';
  var FIRST_ORDER = 'první' + ' objednávku';
  var GIFT = String.fromCodePoint(0x1f381);

  function removeNode(el){
    if(el && el.parentNode) el.parentNode.removeChild(el);
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
    removeNode(document.getElementById('vz-custom-header'));

    var header =
      '<div id="vz-custom-header">'+
        '<div class="vz-top"><div class="vz-top__inner">'+
          '<div>🚚 Doprava zdarma od 1499 Kč</div>'+
          '<div>⚡ Odeslání do 24 hodin</div>'+
          '<div>↩️ Vrácení do 14 dnů</div>'+
          '<div>🐶 Pro psy a kočky skladem</div>'+
          '<div>📞 <a href="tel:774318382">774 318 382</a></div>'+
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
            '<a href="/vyhledavani/?string=kart%C3%A1%C4%8D" class="toi">🪮 KARTÁČE</a>'+
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
  }

  function scheduleCleanup(){
    cleanupLegacyTexts(document.body);
    setTimeout(function(){ cleanupLegacyTexts(document.body); }, 250);
    setTimeout(function(){ cleanupLegacyTexts(document.body); }, 1200);

    if(window.MutationObserver && document.body){
      var observer = new MutationObserver(function(){
        cleanupLegacyTexts(document.body);
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
