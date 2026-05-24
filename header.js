(function(){
  if(document.getElementById('vz-custom-header')) return;
  var header =
    '<div id="vz-custom-header">'+
      '<div class="vz-top"><div class="vz-top__inner">'+
        '<div>🚚 Doprava zdarma od 999 Kč</div>'+
        '<div>⚡ Odeslání do 24 hodin</div>'+
        '<div>🐶 Pro psy a kočky skladem</div>'+
        '<div>🧼 Péče o srst bez chlupů doma</div>'+
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
          '<a href="/proti-linani/" class="key">🧼 PROTI LÍNÁNÍ</a>'+
          '<a href="/skrabadla/" class="cat">🪵 ŠKRABADLA</a>'+
          '<a href="/letni-kolekce/" class="hot">☀️ LETNÍ KOLEKCE</a>'+
          '<a href="/fontanky/" class="wat">💧 FONTÁNKY</a>'+
          '<a href="/automaticke-toalety/" class="toi">🚽 AUTOMATICKÉ TOALETY</a>'+
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
})();
