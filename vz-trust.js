/* ============================================================
   Vyčesáno.cz – sekce „Nakupujte bez starostí" (titulka)
   Nahrazuje dřívější smyšlené recenze (reviews.js) – žádná
   vymyšlená jména, jen ověřitelné sliby obchodu.
   Až budou ověřené recenze (Shoptet/Heureka), patří sem.
   ============================================================ */
(function(){
  function isHome(){
    var p = location.pathname.replace(/\/+$/,'');
    if(p === '' || p === '/') return true;
    var b = document.body;
    return !!(b && (b.classList.contains('type-index') || b.classList.contains('in-index')));
  }

  function ico(name){
    var P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var d={
      check:'<path d="M4 12.5 9.5 18 20 6.5"/>',
      box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
      phone:'<path d="M22 16.9v2.5a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.7 2 2 0 0 1 4.1 1.5h2.5a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L7.8 9.15a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.75 2.05z"/>',
      undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>'
    }[name]||'';
    return P+d+'</svg>';
  }

  function addStyle(){
    if(document.getElementById('vz-trust-style')) return;
    var css =
      '.vz-trust-sec{max-width:1180px;margin:44px auto 36px;padding:0 16px;box-sizing:border-box}'+
      '.vz-trust-sec__head{text-align:center;margin-bottom:24px}'+
      '.vz-trust-sec__head h2{margin:0 0 8px;font-family:var(--vz-font);font-size:clamp(23px,2.4vw,31px);font-weight:var(--vz-w-bold);color:var(--vz-g-800);letter-spacing:-.02em;line-height:1.15}'+
      '.vz-trust-sec__head p{margin:0;color:var(--vz-muted);font-size:15.5px;font-weight:var(--vz-w-body)}'+
      '.vz-trust-sec__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}'+
      '.vz-trust-card{display:flex;flex-direction:column;gap:10px;padding:20px 18px;background:var(--vz-bg);border:1px solid var(--vz-line);border-radius:var(--vz-r-lg);box-shadow:var(--vz-shadow-sm)}'+
      '.vz-trust-card i{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:var(--vz-g-50);color:var(--vz-g)}'+
      '.vz-trust-card i svg{width:21px;height:21px}'+
      '.vz-trust-card strong{color:var(--vz-g-900);font-size:15.5px;font-weight:var(--vz-w-bold);line-height:1.25}'+
      '.vz-trust-card p{margin:0;color:#42544a;font-size:13.5px;line-height:1.5;font-weight:var(--vz-w-body)}'+
      '.vz-trust-card a{color:var(--vz-g);font-weight:var(--vz-w-bold);text-decoration:none}'+
      '.vz-trust-card a:hover{text-decoration:underline;text-underline-offset:3px}'+
      '@media(max-width:980px){.vz-trust-sec__grid{grid-template-columns:1fr 1fr}}'+
      '@media(max-width:600px){.vz-trust-sec{margin:30px auto 26px}.vz-trust-sec__grid{grid-template-columns:1fr;gap:10px}}';
    var s=document.createElement('style');s.id='vz-trust-style';s.textContent=css;
    document.head.appendChild(s);
  }

  function build(){
    if(!isHome() || document.getElementById('vz-trust-sec')) return;
    /* vložit PŘED nativní patičku (dřív sekce končila až pod ní) */
    var anchor = document.querySelector('#footer') || document.querySelector('.vz-footer');
    if(!anchor || !anchor.parentNode) return;

    addStyle();

    var sec = document.createElement('section');
    sec.id = 'vz-trust-sec';
    sec.className = 'vz-trust-sec';
    sec.innerHTML =
      '<div class="vz-trust-sec__head">'+
        '<h2>Nakupujte bez starostí</h2>'+
        '<p>Malý obchod, osobní přístup. Tohle u nás platí pro každou objednávku.</p>'+
      '</div>'+
      '<div class="vz-trust-sec__grid">'+
        '<div class="vz-trust-card"><i>'+ico('check')+'</i><strong>Vybíráme kus po kusu</strong><p>Prodáváme jen to, co dává pro psy a kočky smysl. Žádný zaplevelený katalog.</p></div>'+
        '<div class="vz-trust-card"><i>'+ico('box')+'</i><strong>Odeslání do 24 hodin</strong><p>Skladové zboží balíme v den objednávky. Od 1 499 Kč s dopravou zdarma.</p></div>'+
        '<div class="vz-trust-card"><i>'+ico('phone')+'</i><strong>Poradíme před nákupem</strong><p>Nevíte, co vybrat? Zavolejte na <a href="tel:774318382">774 318 382</a> nebo napište.</p></div>'+
        '<div class="vz-trust-card"><i>'+ico('undo')+'</i><strong>14 dní na vrácení</strong><p>Nesedí velikost nebo mazlíček nemá zájem? Vraťte zboží bez udání důvodu.</p></div>'+
      '</div>';

    anchor.parentNode.insertBefore(sec, anchor);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
  window.addEventListener('load', build);
  setTimeout(build, 600);
})();
