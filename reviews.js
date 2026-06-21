/* ============================================================
   Vyčesáno.cz – sekce recenzí „Co říkají naši zákazníci"
   Reálné ohlasy zákazníků. Injektuje se na titulce nad patičku.
   Self-contained: vloží si vlastní <style> i obsah.
   ============================================================ */
(function(){
  function isHome(){
    var p = location.pathname.replace(/\/+$/,'');
    return p === '' || p === '/';
  }

  var REVIEWS = [
    {t:"Automatická fontánka — voda vždy čerstvá, kočka pije víc než dřív.", n:"Petra K.", c:"Brno"},
    {t:"Obojek drží perfektně, pes ho ani nevnímá.", n:"Jan M.", c:"Praha"},
    {t:"Škrabadlo pro kočku, gauč zachráněn. Klasika.", n:"Lucie H.", c:"Ostrava"},
    {t:"Automatické krmítko — pes nakrmený, i když přijdu pozdě z práce.", n:"Markéta S.", c:"Olomouc"},
    {t:"Cestovní miska složitelná, do batohu se vejde bez problémů.", n:"Tomáš R.", c:"Plzeň"},
    {t:"Interaktivní hračka baví kočku hodiny, gauč ji konečně nezajímá.", n:"Eva P.", c:"Liberec"},
    {t:"Pelíšek měkký, pes z něj nevstane ani na venčení.", n:"Simona B.", c:"České Budějovice"},
    {t:"Antiparazitika dorazila rychle, pes bez klíšťat celé léto.", n:"Jana D.", c:"Hradec Králové"},
    {t:"Nerezová miska — konečně něco, co nejde rozkousat.", n:"Pavel N.", c:"Zlín"},
    {t:"Vodítko pevné, přezky drží, pes tahá, ale neunikne.", n:"Klára V.", c:"Pardubice"},
    {t:"Automatická toaleta — čištění jednou za týden místo každý den. Životní změna.", n:"Martin Č.", c:"Brno"},
    {t:"Hračky pro psa kvalitní. Nevydržely věčně, ale za tu cenu super.", n:"Radka M.", c:"Praha"},
    {t:"Jídelní set vypadá hezky a je praktický, na stůl bych to dala.", n:"Hana K.", c:"Jihlava"},
    {t:"Letní kolekce — chladicí podložka, pes na ní spí celý den.", n:"Ondřej F.", c:"Ústí nad Labem"},
    {t:"Vše skladem, doručení druhý den, balení v pořádku. Objednám znovu.", n:"Věra L.", c:"Opava"}
  ];

  var AVATARS = [
    'linear-gradient(135deg,#2d714f,#215b40)',
    'linear-gradient(135deg,#e0b15c,#bf8b2f)',
    'linear-gradient(135deg,#3a8160,#22624a)'
  ];

  function addStyle(){
    if(document.getElementById('vz-reviews-style')) return;
    var css =
      '.vz-reviews{max-width:1180px;margin:42px auto 8px;padding:0 16px;box-sizing:border-box}'+
      '.vz-reviews__head{text-align:center;margin-bottom:26px}'+
      '.vz-reviews__badge{display:inline-flex;align-items:center;gap:7px;margin-bottom:14px;padding:7px 14px;border-radius:999px;background:#fff8e8;color:#bf8b2f;border:1px solid rgba(214,163,74,.35);font-size:12.5px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}'+
      '.vz-reviews__head h2{margin:0 0 8px;font-size:clamp(24px,2.6vw,34px);font-weight:950;color:#173d2b;letter-spacing:-.02em;line-height:1.15}'+
      '.vz-reviews__head p{margin:0;color:#54665b;font-size:16px}'+
      '.vz-reviews__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}'+
      '.vz-review{display:flex;flex-direction:column;gap:12px;padding:20px;background:#fff;border:1px solid rgba(33,91,64,.12);border-radius:18px;box-shadow:0 6px 16px rgba(25,45,35,.06);transition:transform .18s ease,box-shadow .18s ease}'+
      '.vz-review:hover{transform:translateY(-3px);box-shadow:0 16px 34px rgba(25,45,35,.10)}'+
      '.vz-review__stars{color:#e8a73a;font-size:15px;letter-spacing:2px;line-height:1}'+
      '.vz-review__text{margin:0;color:#2a3d31;font-size:15px;line-height:1.55;font-weight:600;flex:1 0 auto}'+
      '.vz-review__author{display:flex;align-items:center;gap:12px;margin-top:2px}'+
      '.vz-review__avatar{width:42px;height:42px;min-width:42px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:17px}'+
      '.vz-review__meta strong{display:block;color:#173d2b;font-size:14.5px;font-weight:900;line-height:1.2}'+
      '.vz-review__meta small{color:#7a8a80;font-size:12.5px}'+
      '@media(max-width:980px){.vz-reviews__grid{grid-template-columns:repeat(2,1fr)}}'+
      '@media(max-width:600px){.vz-reviews__grid{grid-template-columns:1fr}.vz-reviews{margin:30px auto 6px}}';
    var s=document.createElement('style');s.id='vz-reviews-style';s.textContent=css;
    document.head.appendChild(s);
  }

  function esc(str){
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function build(){
    if(!isHome() || document.getElementById('vz-reviews')) return;
    var anchor = document.querySelector('.vz-footer') || document.querySelector('#footer') ||
                 document.querySelector('main') || document.querySelector('.content');
    if(!anchor) return;

    addStyle();

    var cards = REVIEWS.map(function(r, i){
      return '<article class="vz-review">'+
        '<div class="vz-review__stars" aria-label="5 z 5 hvězd">★★★★★</div>'+
        '<p class="vz-review__text">„'+esc(r.t)+'"</p>'+
        '<div class="vz-review__author">'+
          '<span class="vz-review__avatar" style="background:'+AVATARS[i % AVATARS.length]+'">'+esc(r.n.charAt(0))+'</span>'+
          '<span class="vz-review__meta"><strong>'+esc(r.n)+'</strong><small>'+esc(r.c)+'</small></span>'+
        '</div>'+
      '</article>';
    }).join('');

    var sec = document.createElement('section');
    sec.id = 'vz-reviews';
    sec.className = 'vz-reviews';
    sec.innerHTML =
      '<div class="vz-reviews__head">'+
        '<span class="vz-reviews__badge">★ Hodnocení zákazníků</span>'+
        '<h2>Co říkají naši zákazníci</h2>'+
        '<p>Reálné ohlasy spokojených majitelů psů a koček.</p>'+
      '</div>'+
      '<div class="vz-reviews__grid">'+cards+'</div>';

    if(anchor.classList.contains('vz-footer') || anchor.id === 'footer'){
      anchor.parentNode.insertBefore(sec, anchor);
    } else {
      anchor.appendChild(sec);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
  window.addEventListener('load', build);
  setTimeout(build, 600);
})();
