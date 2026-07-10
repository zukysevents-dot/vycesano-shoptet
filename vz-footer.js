/* ============================================================
   Vyčesáno.cz – zelená patička + sekce „Co hledáte" (titulka)
   Markup se vkládá JS-em, protože Shoptet pole „Zápatí" má limit
   8192 znaků – v adminu zůstává jen krátký loader tohoto souboru.
   Styly: vz-footer.css (načítá se v Záhlaví).
   ============================================================ */
(function(){
  function ico(name){
    var P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var d={
      phone:'<path d="M22 16.9v2.5a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.7 2 2 0 0 1 4.1 1.5h2.5a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L7.8 9.15a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.75 2.05z"/>',
      mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6 9 7 9-7"/>',
      bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
      truck:'<path d="M1 5h13v11H1zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
      brush:'<path d="M4 14c3-1 5-1 8 0s5 1 8 0"/><path d="M6 14V8m4 6V6m4 8V8m4 6V9"/><path d="M4 14v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"/>',
      dog:'<path d="M10 5.5 8 3H4l1 5-2 3 3 1v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5l2-2-2-6-4 1z"/><circle cx="15" cy="9" r=".9" fill="currentColor" stroke="none"/>',
      cat:'<path d="M12 5c1.2 0 2.3.3 3.2.9L19 3v6a7 7 0 1 1-14 0V3l3.8 2.9A6.6 6.6 0 0 1 12 5z"/><path d="M12 16v5m-4-1.5V21m8-1.5V21"/><circle cx="9.5" cy="9.5" r=".9" fill="currentColor" stroke="none"/><circle cx="14.5" cy="9.5" r=".9" fill="currentColor" stroke="none"/>',
      heart:'<path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.6 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z"/><path d="M12 10v5m-2.5-2.5h5"/>',
      tree:'<path d="M12 3v18M12 21H7m5 0h5"/><path d="M8 7.5h8M6.5 12h11M5.5 16.5h13"/>',
      sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4m0 14.2v2.4M2.5 12h2.4m14.2 0h2.4M5 5l1.7 1.7m10.6 10.6L19 19M19 5l-1.7 1.7M6.7 17.3 5 19"/>'
    }[name]||'';
    return P+d+'</svg>';
  }

  /* --- Zelená patička (na všech stránkách, na konec body) --- */
  function insertFooter(){
    if(!document.body||document.querySelector('.vz-footer'))return;
    var f=document.createElement('footer');
    f.className='vz-footer';
    f.innerHTML=
      '<div class="vz-footer-wrap">'+
        '<div>'+
          '<div class="vz-footer-logo">'+
            '<img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz">'+
            '<div>Vyčesáno<span>.cz</span></div>'+
          '</div>'+
          '<p class="vz-footer-claim">Vybrané produkty pro péči o psy a kočky. Méně chlupů doma, spokojenější mazlíček.</p>'+
        '</div>'+
        '<div>'+
          '<h4>Zákaznická sekce</h4>'+
          '<div class="vz-footer-links">'+
            '<a href="/faq/">Časté dotazy</a>'+
            '<a href="/doprava-a-platba/">Doprava a platba</a>'+
            '<a href="/obchodni-podminky/">Obchodní podmínky</a>'+
            '<a href="/podminky-ochrany-osobnich-udaju/">Ochrana osobních údajů</a>'+
            '<a href="/tipy-rady/">Tipy a rady</a>'+
          '</div>'+
        '</div>'+
        '<div>'+
          '<h4>Kategorie</h4>'+
          '<div class="vz-footer-links">'+
            '<a href="/proti-linani/">Proti línání</a>'+
            '<a href="/pro-psy/">Pro psy</a>'+
            '<a href="/pro-kocky/">Pro kočky</a>'+
            '<a href="/lekarna-pro-mazlicky/">Lékárna pro mazlíčky</a>'+
            '<a href="/skrabadla/">Škrabadla</a>'+
          '</div>'+
        '</div>'+
        '<div>'+
          '<h4>Kontakt</h4>'+
          '<div class="vz-contact">'+
            '<div>'+ico('phone')+'<a href="tel:774318382">774 318 382</a></div>'+
            '<div>'+ico('mail')+'<a href="mailto:info@vycesano.cz">info@vycesano.cz</a></div>'+
            '<div>'+ico('bolt')+'Odeslání do 24 hodin</div>'+
            '<div>'+ico('truck')+'Doprava zdarma od 1 499 Kč</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="vz-bottom">'+
        '<div>© 2026 Vyčesáno.cz — Všechna práva vyhrazena</div>'+
        '<div><a href="/obchodni-podminky/">Obchodní podmínky</a> · <a href="/podminky-ochrany-osobnich-udaju/">Ochrana osobních údajů</a></div>'+
      '</div>';
    document.body.appendChild(f);
  }

  /* --- Sekce „Co hledáte pro svého mazlíčka?" (jen titulka) --- */
  function isHome(){
    var p=location.pathname.replace(/\/+$/,'');
    if(p===''||p==='/')return true;
    var b=document.body;
    return !!(b&&(b.classList.contains('type-index')||b.classList.contains('in-index')));
  }

  function homeGuide(){
    if(!isHome()||document.getElementById('vhg'))return;
    var h=document.querySelector('#vz-homepage-hero-auto,.carousel-inner,.homepage-slides,.slides,.banners-row');
    if(!h)return;
    var s=document.createElement('section');
    s.id='vhg';
    s.className='vhg';
    s.innerHTML='<h2>Co hledáte pro svého mazlíčka?</h2><p>Vyberte podle toho, co doma řešíte – chlupy, zdraví, škrábání nebo letní horka.</p><div class="vhg-grid">'+
      '<a class="vhg-card" href="/proti-linani/">'+ico('brush')+'Proti línání <span>›</span></a>'+
      '<a class="vhg-card" href="/pro-psy/">'+ico('dog')+'Pro psy <span>›</span></a>'+
      '<a class="vhg-card" href="/pro-kocky/">'+ico('cat')+'Pro kočky <span>›</span></a>'+
      '<a class="vhg-card" href="/lekarna-pro-mazlicky/">'+ico('heart')+'Lékárna pro mazlíčky <span>›</span></a>'+
      '<a class="vhg-card" href="/skrabadla/">'+ico('tree')+'Škrabadla <span>›</span></a>'+
      '<a class="vhg-card" href="/letni-kolekce/">'+ico('sun')+'Letní výbava <span>›</span></a>'+
    '</div>';
    h.insertAdjacentElement('afterend',s);
  }

  function run(){insertFooter();homeGuide();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',run);
  setTimeout(run,700);
})();
