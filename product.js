/* ============================================================
   Vyčesáno.cz – produktový detail: trust řádek + průvodce
   výběrem + nabídka pomoci. Vkládá se pod tlačítko Do košíku.
   Texty podle typu produktu (klíčová slova z názvu/drobečků).
   ============================================================ */
(function(){
  function ico(name){
    var P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var d={
      bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
      truck:'<path d="M1 5h13v11H1zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
      undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>'
    }[name]||'';
    return P+d+'</svg>';
  }

  function normalizeText(value){
    var text=(value||'').toString().toLowerCase();
    if(text.normalize) text=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return text.replace(/\s+/g,' ');
  }

  function build(){
    if(document.getElementById('vz-product-upgrade')) return true;

    var addToCart=document.querySelector('.p-detail .add-to-cart,.add-to-cart[data-testid="divAddToCart"]');
    if(!addToCart) return false;

    function discard(el){
      if(el && el.parentNode) el.parentNode.removeChild(el);
    }

    discard(document.getElementById('vpt'));
    var oldBlocks=document.querySelectorAll('.vpt');
    for(var i=0;i<oldBlocks.length;i++) discard(oldBlocks[i]);

    var shortDesc=document.querySelector('.p-detail .p-short-description');
    if(shortDesc && shortDesc.parentNode && addToCart.parentNode && shortDesc.nextElementSibling!==addToCart){
      addToCart.parentNode.insertBefore(shortDesc,addToCart);
    }

    var nameEl=document.querySelector('[data-testid="productCardName"],h1');
    var crumbs=document.querySelector('.breadcrumbs');
    var pageText=normalizeText([
      nameEl ? nameEl.textContent : '',
      crumbs ? crumbs.textContent : '',
      document.title
    ].join(' '));

    var fit={
      label:'Doporučení',
      title:'Praktické řešení pro každodenní péči',
      who:'Pro majitele psů a koček, kteří chtějí jednoduché a funkční řešení.',
      solves:'Zlepšuje pohodlí, péči nebo čistotu v domácnosti.',
      use:'Vyberte podle potřeby mazlíčka a řiďte se doporučením u produktu.'
    };

    if(/skrab/.test(pageText)){
      fit={label:'Pro kočky',title:'Vlastní místo na škrábání i odpočinek',who:'Pro kočky, které potřebují škrábat, protáhnout se a mít své místo.',solves:'Chrání nábytek a podporuje přirozené obrušování drápků.',use:'Umístěte tam, kde kočka odpočívá nebo už zkouší škrábat.'};
    }else if(/kartac|hreben|hrablo|vyces|rukavic|furminator/.test(pageText)){
      fit={label:'Proti línání',title:'Méně chlupů doma a lepší péče o srst',who:'Pro psy a kočky, u kterých chcete pravidelně pečovat o srst.',solves:'Odstraňuje uvolněné chlupy a pomáhá omezit chlupy v bytě.',use:'Vyčesávejte jemně podle typu srsti, ideálně několikrát týdně.'};
    }else if(/sampon|kondicion|sprej|kosmetik|srst|shampoo|conditioner/.test(pageText)){
      fit={label:'Péče o srst',title:'Čistší a příjemnější srst bez složité péče',who:'Pro mazlíčky, kteří potřebují čistší nebo lépe upravitelnou srst.',solves:'Pomáhá s hygienou, vůní, rozčesáváním a péčí o srst.',use:'Používejte podle návodu na obalu a typu srsti vašeho mazlíčka.'};
    }else if(/fontan|napajec/.test(pageText)){
      fit={label:'Pitný režim',title:'Čerstvá voda, která kočku víc láká',who:'Pro kočky, které málo pijí nebo preferují proudící vodu.',solves:'Podporuje lepší pitný režim a stálý přístup k vodě.',use:'Postavte na klidné místo a pravidelně doplňujte vodu podle návodu.'};
    }else if(/toalet|scoopfree|smartspin|moeza/.test(pageText)){
      fit={label:'Čistší domácnost',title:'Méně starostí s kočičí toaletou',who:'Pro domácnosti, kde chcete jednodušší péči o kočičí toaletu.',solves:'Snižuje každodenní úklid a pomáhá udržet okolí toalety čistší.',use:'Používejte podle návodu výrobce a pravidelně kontrolujte náplň.'};
    }else if(/chlad|ochlaz|letni/.test(pageText)){
      fit={label:'Letní výbava',title:'Víc pohodlí pro psa v horkých dnech',who:'Pro psy během horkých dnů, cestování nebo delších procházek.',solves:'Zvyšuje komfort psa v teple a zpříjemňuje pobyt venku i doma.',use:'Používejte hlavně při vyšších teplotách a po aktivitě.'};
    }else if(/obojek|vodit|vycvik|stek|trener|postroj/.test(pageText)){
      fit={label:'Venčení',title:'Víc kontroly a jistoty při venčení',who:'Pro bezpečnější venčení, výcvik a lepší kontrolu psa.',solves:'Pomáhá při procházkách, tréninku nebo řešení chování.',use:'Vyberte správnou velikost a vždy myslete na pohodlí psa.'};
    }else if(/hrack|kong|wobbler|ring|mic/.test(pageText)){
      fit={label:'Zábava',title:'Zábava, pohyb a chytré zabavení',who:'Pro psy a kočky, kteří potřebují zábavu, pohyb nebo stimulaci.',solves:'Pomáhá zabavit mazlíčka a podpořit aktivnější trávení času.',use:'Používejte pod dohledem a vybírejte podle velikosti mazlíčka.'};
    }

    var html=
      '<section id="vz-product-upgrade" class="vz-px">'+
        '<div class="vz-px__trust">'+
          '<span>'+ico('bolt')+'Odeslání do 24 h</span>'+
          '<span>'+ico('truck')+'Doprava zdarma od 1 499 Kč</span>'+
          '<span>'+ico('undo')+'Vrácení do 14 dnů</span>'+
        '</div>'+
        '<div class="vz-px__guide">'+
          '<div class="vz-px__top"><em>'+fit.label+'</em><h3>'+fit.title+'</h3></div>'+
          '<div class="vz-px__rows">'+
            '<div><strong>Pro koho</strong><span>'+fit.who+'</span></div>'+
            '<div><strong>Co řeší</strong><span>'+fit.solves+'</span></div>'+
            '<div><strong>Použití</strong><span>'+fit.use+'</span></div>'+
          '</div>'+
        '</div>'+
        '<div class="vz-px__help"><span><b>Nejste si jistí výběrem?</b> Poradíme před nákupem.</span><a href="tel:774318382">774 318 382</a></div>'+
      '</section>';

    addToCart.insertAdjacentHTML('afterend',html);
    return true;
  }

  /* Shoptet může blok detailu dorenderovat později – omezený retry. */
  function run(){
    if(build()) return;
    setTimeout(function(){
      if(build()) return;
      setTimeout(build, 900);
    }, 300);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
