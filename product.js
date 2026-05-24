(function(){
  if(document.getElementById('vz-product-upgrade')) return;
  var addToCart=document.querySelector('.p-detail .add-to-cart,.add-to-cart[data-testid="divAddToCart"]');
  if(!addToCart) return;

  var old=document.getElementById('vpt');
  if(old) old.remove();
  document.querySelectorAll('.vpt').forEach(function(el){el.remove();});

  var nameEl=document.querySelector('[data-testid="productCardName"],h1');
  var name=(nameEl?nameEl.textContent:document.title).toLowerCase();
  var fit={
    who:'Pro majitele psů a koček, kteří chtějí praktický produkt bez složitého výběru.',
    solves:'Pomáhá zlepšit každodenní péči, pohodlí nebo čistotu doma.',
    use:'Používejte podle potřeby a doporučení u konkrétního produktu.'
  };

  if(/škrabad|skrab/.test(name)){
    fit={who:'Pro kočky, které potřebují škrábat, protáhnout se a vybít energii.',solves:'Chrání nábytek, pomáhá brousit drápky a dává kočce vlastní místo na škrábání.',use:'Umístěte na dostupné místo, ideálně tam, kde kočka běžně odpočívá nebo škrábe.'};
  }else if(/kartáč|kartac|hřeben|hreben|hrablo|vyčes|vyces|rukavic/.test(name)){
    fit={who:'Pro psy a kočky, kterým chcete pravidelně pečovat o srst.',solves:'Pomáhá odstranit uvolněné chlupy, pročesat srst a omezit množství chlupů doma.',use:'Vyčesávejte jemně podle typu srsti, ideálně pravidelně několikrát týdně.'};
  }else if(/šampon|sampon|kondicion|sprej|kosmetik|srst|detangler|shampoo|conditioner/.test(name)){
    fit={who:'Pro mazlíčky, kteří potřebují čistší, voňavější nebo lépe upravitelnou srst.',solves:'Pomáhá s běžnou hygienou, rozčesáváním, vůní a celkovou péčí o srst.',use:'Používejte podle návodu na obalu a typu srsti vašeho mazlíčka.'};
  }else if(/fontán|fontan|napáječ|napajec/.test(name)){
    fit={who:'Pro kočky, které málo pijí nebo mají raději čerstvě proudící vodu.',solves:'Podporuje lepší pitný režim a stálý přístup k čerstvé vodě.',use:'Umístěte na klidné místo a pravidelně doplňujte vodu podle návodu.'};
  }else if(/toalet|scoopfree|smartspin|moeza/.test(name)){
    fit={who:'Pro domácnosti, kde chcete pohodlnější a čistší péči o kočičí toaletu.',solves:'Pomáhá snížit každodenní úklid a udržet okolí toalety čistší.',use:'Používejte podle návodu výrobce a pravidelně kontrolujte náplň nebo příslušenství.'};
  }else if(/chlad|ochlaz/.test(name)){
    fit={who:'Pro psy během horkých dnů, cestování nebo letních procházek.',solves:'Pomáhá zvýšit komfort psa v teple a zpříjemnit mu pobyt venku i doma.',use:'Používejte v létě podle návodu, hlavně při vyšších teplotách a po aktivitě.'};
  }else if(/obojek|vodít|vodit|výcvik|vycvik|štěk|stek|trenér|trener/.test(name)){
    fit={who:'Pro bezpečnější venčení, výcvik a lepší kontrolu psa.',solves:'Pomáhá při každodenních procházkách, tréninku nebo řešení konkrétního chování.',use:'Vyberte správnou velikost a používejte vždy s ohledem na pohodlí psa.'};
  }else if(/hračk|hrack|kong|wobbler|ring/.test(name)){
    fit={who:'Pro psy a kočky, kteří potřebují zábavu, pohyb nebo mentální stimulaci.',solves:'Pomáhá zabavit mazlíčka a podpořit aktivnější trávení času.',use:'Používejte pod dohledem a vybírejte podle velikosti a stylu hry.'};
  }

  var html=
    '<section id="vz-product-upgrade" class="vz-px">'+
      '<div class="vz-px__trust">'+
        '<div><strong>🚚</strong>Odeslání do 24 hodin</div>'+
        '<div><strong>💚</strong>Doprava zdarma od 999 Kč</div>'+
        '<div><strong>🔒</strong>Bezpečná platba</div>'+
        '<div><strong>↩️</strong>Vrácení do 14 dnů</div>'+
      '</div>'+
      '<div class="vz-px__fit">'+
        '<h3>Rychlé rozhodnutí</h3>'+
        '<div class="vz-px__grid">'+
          '<div class="vz-px__row"><b>Pro koho</b><span>'+fit.who+'</span></div>'+
          '<div class="vz-px__row"><b>Řeší</b><span>'+fit.solves+'</span></div>'+
          '<div class="vz-px__row"><b>Použití</b><span>'+fit.use+'</span></div>'+
        '</div>'+
      '</div>'+
      '<div class="vz-px__help"><span>Nejste si jistí výběrem? Rádi poradíme.</span><a href="tel:774318382">Zavolat 774 318 382</a></div>'+
    '</section>';
  addToCart.insertAdjacentHTML('afterend',html);
})();
