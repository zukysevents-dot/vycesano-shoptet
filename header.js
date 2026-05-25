(function(){
  var oldHeader = document.getElementById('vz-custom-header');
  if(oldHeader && oldHeader.parentNode){
    oldHeader.parentNode.removeChild(oldHeader);
  }

  var header =
    '<div id="vz-custom-header">'+

      '<div class="vz-top">'+
        '<div class="vz-top__inner">'+
          '<div>🚚 Doprava zdarma od 1499 Kč</div>'+
          '<div>⚡ Odeslání do 24 hodin</div>'+
          '<div>↩️ Vrácení do 14 dnů</div>'+
          '<div>🐶 Pro psy a kočky skladem</div>'+
          '<div>📞 <a href="tel:774318382">774 318 382</a></div>'+
        '</div>'+
      '</div>'+

      '<div class="vz-header">'+
        '<div class="vz-header__box">'+

          '<div class="vz-header__main">'+

            '<a href="/" class="vz-logo" aria-label="Vyčesáno.cz">'+
              '<img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz">'+
              '<div>Vyčesáno<span>.cz</span></div>'+
            '</a>'+

            '<form action="/vyhledavani/" method="get" class="vz-search">'+
              '<input type="text" name="string" placeholder="Hledejte kartáče, hřebeny a pomůcky proti chlupům...">'+
              '<button type="submit">HLEDAT</button>'+
            '</form>'+

            '<a href="/kosik/" class="vz-cart" aria-label="Košík">🛒</a>'+

          '</div>'+

          '<nav class="vz-menu" aria-label="Hlavní kategorie">'+
            '<a href="/proti-linani/" class="key">🧼 PROTI LÍNÁNÍ</a>'+
            '<a href="/pro-psy/">🐶 PRO PSY</a>'+
            '<a href="/pro-kocky/">🐱 PRO KOČKY</a>'+
            '<a href="/vyhledavani/?string=kart%C3%A1%C4%8D">⭐ KARTÁČE A HŘEBENY</a>'+
            '<a href="/skrabadla/" class="cat">🪵 ŠKRABADLA</a>'+
            '<a href="/fontanky/" class="wat">💧 FONTÁNKY</a>'+
            '<a href="/letni-kolekce/" class="hot">☀️ LETNÍ VÝBAVA</a>'+
          '</nav>'+

        '</div>'+
      '</div>'+

    '</div>';

  document.body.insertAdjacentHTML('afterbegin', header);

  var path = window.location.pathname.replace(/\/$/,'') + '/';

  document.querySelectorAll('.vz-menu a').forEach(function(link){
    var href = link.getAttribute('href');

    if(!href) return;

    var cleanHref = href.split('?')[0];

    if(cleanHref !== '/' && path.indexOf(cleanHref) === 0){
      link.classList.add('is-active');
      link.setAttribute('aria-current','page');
    }
  });

  function cleanupOldHeaderText(){
    document.querySelectorAll('body *').forEach(function(el){
      if(el.children.length) return;

      if(el.textContent){
        el.textContent = el.textContent
          .replace('🎁 10 % na první objednávku: CHLUPY10', '🚚 Doprava zdarma od 1499 Kč')
          .replace('10 % na první objednávku: CHLUPY10', 'Doprava zdarma od 1499 Kč')
          .replace('CHLUPY10', '')
          .replace('Doprava zdarma od 999 Kč', 'Doprava zdarma od 1499 Kč')
          .replace('Doprava zdarma od 999 Kč.', 'Doprava zdarma od 1499 Kč.');
      }
    });
  }

  cleanupOldHeaderText();
  setTimeout(cleanupOldHeaderText, 500);
  setTimeout(cleanupOldHeaderText, 1500);
  setTimeout(cleanupOldHeaderText, 3000);
})();
