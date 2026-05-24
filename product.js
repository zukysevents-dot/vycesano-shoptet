(function(){
  if(document.getElementById('vz-product-upgrade')) return;

  var addToCart=document.querySelector('.p-detail .add-to-cart,.add-to-cart[data-testid="divAddToCart"]');
  if(!addToCart) return;

  function discard(el){
    if(el && el.parentNode) el.parentNode.removeChild(el);
  }

  var old=document.getElementById('vpt');
  discard(old);
  var oldBlocks=document.querySelectorAll('.vpt');
  for(var i=0;i<oldBlocks.length;i++) discard(oldBlocks[i]);

  var shortDesc=document.querySelector('.p-detail .p-short-description');
  if(shortDesc && shortDesc.parentNode && addToCart.parentNode && shortDesc.nextElementSibling!==addToCart){
    addToCart.parentNode.insertBefore(shortDesc,addToCart);
  }

  function normalizeText(value){
    var text=(value||'').toString().toLowerCase();
    if(text.normalize) text=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return text.replace(/\s+/g,' ');
  }

  var nameEl=document.querySelector('[data-testid="productCardName"],h1');
  var crumbs=document.querySelector('.breadcrumbs');
  var pageText=normalizeText([
    nameEl ? nameEl.textContent : '',
    crumbs ? crumbs.textContent : '',
    document.title
  ].join(' '));

  var fit={
    label:'Doporu&#269;en&#237;',
    title:'Praktick&#233; &#345;e&#353;en&#237; pro ka&#382;dodenn&#237; p&#233;&#269;i',
    intro:'Stru&#269;n&#283; to hlavn&#237;, abyste se mohli rozhodnout rychle a s jistotou.',
    who:'Pro majitele ps&#367; a ko&#269;ek, kte&#345;&#237; cht&#283;j&#237; jednoduch&#233; a funk&#269;n&#237; &#345;e&#353;en&#237;.',
    solves:'Zlep&#353;uje pohodl&#237;, p&#233;&#269;i nebo &#269;istotu v dom&#225;cnosti.',
    use:'Vyberte podle pot&#345;eby mazl&#237;&#269;ka a &#345;i&#271;te se doporu&#269;en&#237;m u produktu.'
  };

  if(/skrab/.test(pageText)){
    fit={label:'Pro ko&#269;ky',title:'Vlastn&#237; m&#237;sto na &#353;kr&#225;b&#225;n&#237; i odpo&#269;inek',intro:'Pom&#225;h&#225; ko&#269;ce vyb&#237;t energii a z&#225;rove&#328; chr&#225;n&#237; dom&#225;cnost.',who:'Pro ko&#269;ky, kter&#233; pot&#345;ebuj&#237; &#353;kr&#225;bat, prot&#225;hnout se a m&#237;t sv&#233; m&#237;sto.',solves:'Chr&#225;n&#237; n&#225;bytek a podporuje p&#345;irozen&#233; obru&#353;ov&#225;n&#237; dr&#225;pk&#367;.',use:'Dejte ho tam, kde ko&#269;ka odpo&#269;&#237;v&#225; nebo u&#382; zkou&#353;&#237; &#353;kr&#225;bat.'};
  }else if(/kartac|hreben|hrablo|vyces|rukavic|furminator/.test(pageText)){
    fit={label:'Proti l&#237;n&#225;n&#237;',title:'M&#233;n&#283; chlup&#367; doma a lep&#353;&#237; p&#233;&#269;e o srst',intro:'Pro pravideln&#233; vy&#269;es&#225;v&#225;n&#237; bez zbyte&#269;n&#233; slo&#382;itosti.',who:'Pro psy a ko&#269;ky, u kter&#253;ch chcete pravideln&#283; pe&#269;ovat o srst.',solves:'Odstra&#328;uje uvoln&#283;n&#233; chlupy a pom&#225;h&#225; omezit chlupy v byt&#283;.',use:'Vy&#269;es&#225;vejte jemn&#283; podle typu srsti, ide&#225;ln&#283; n&#283;kolikr&#225;t t&#253;dn&#283;.'};
  }else if(/sampon|kondicion|sprej|kosmetik|srst|shampoo|conditioner/.test(pageText)){
    fit={label:'P&#233;&#269;e o srst',title:'&#268;ist&#353;&#237; a p&#345;&#237;jemn&#283;j&#353;&#237; srst bez slo&#382;it&#233; p&#233;&#269;e',intro:'Vhodn&#233; pro b&#283;&#382;nou hygienu, roz&#269;es&#225;n&#237; a lep&#353;&#237; pocit ze srsti.',who:'Pro mazl&#237;&#269;ky, kte&#345;&#237; pot&#345;ebuj&#237; &#269;ist&#353;&#237; nebo l&#233;pe upravitelnou srst.',solves:'Pom&#225;h&#225; s hygienou, v&#367;n&#237;, roz&#269;es&#225;v&#225;n&#237;m a p&#233;&#269;&#237; o srst.',use:'Pou&#382;&#237;vejte podle n&#225;vodu na obalu a typu srsti va&#353;eho mazl&#237;&#269;ka.'};
  }else if(/fontan|napajec/.test(pageText)){
    fit={label:'Pitn&#253; re&#382;im',title:'&#268;erstv&#225; voda, kter&#225; ko&#269;ku v&#237;c l&#225;k&#225;',intro:'Tekouc&#237; voda b&#253;v&#225; pro ko&#269;ky p&#345;irozen&#283;j&#353;&#237; ne&#382; klasick&#225; miska.',who:'Pro ko&#269;ky, kter&#233; m&#225;lo pij&#237; nebo preferuj&#237; proud&#237;c&#237; vodu.',solves:'Podporuje lep&#353;&#237; pitn&#253; re&#382;im a st&#225;l&#253; p&#345;&#237;stup k vod&#283;.',use:'Postavte na klidn&#233; m&#237;sto a pravideln&#283; dopl&#328;ujte vodu podle n&#225;vodu.'};
  }else if(/toalet|scoopfree|smartspin|moeza/.test(pageText)){
    fit={label:'&#268;ist&#353;&#237; dom&#225;cnost',title:'M&#233;n&#283; starost&#237; s ko&#269;i&#269;&#237; toaletou',intro:'Praktick&#233; &#345;e&#353;en&#237; pro pohodln&#283;j&#353;&#237; &#250;dr&#382;bu a &#269;ist&#353;&#237; okol&#237;.',who:'Pro dom&#225;cnosti, kde chcete jednodu&#353;&#353;&#237; p&#233;&#269;i o ko&#269;i&#269;&#237; toaletu.',solves:'Sni&#382;uje ka&#382;dodenn&#237; &#250;klid a pom&#225;h&#225; udr&#382;et okol&#237; toalety &#269;ist&#353;&#237;.',use:'Pou&#382;&#237;vejte podle n&#225;vodu v&#253;robce a pravideln&#283; kontrolujte n&#225;pl&#328;.'};
  }else if(/chlad|ochlaz|letni/.test(pageText)){
    fit={label:'Letn&#237; v&#253;bava',title:'V&#237;c pohodl&#237; pro psa v hork&#253;ch dnech',intro:'Pro letn&#237; proch&#225;zky, cestov&#225;n&#237; i odpo&#269;inek v teple.',who:'Pro psy b&#283;hem hork&#253;ch dn&#367;, cestov&#225;n&#237; nebo del&#353;&#237;ch proch&#225;zek.',solves:'Zvy&#353;uje komfort psa v teple a zp&#345;&#237;jem&#328;uje pobyt venku i doma.',use:'Pou&#382;&#237;vejte hlavn&#283; p&#345;i vy&#353;&#353;&#237;ch teplot&#225;ch a po aktivit&#283;.'};
  }else if(/obojek|vodit|vycvik|stek|trener|postroj/.test(pageText)){
    fit={label:'Ven&#269;en&#237;',title:'V&#237;c kontroly a jistoty p&#345;i ven&#269;en&#237;',intro:'Praktick&#225; pom&#367;cka pro b&#283;&#382;n&#233; situace se psem.',who:'Pro bezpe&#269;n&#283;j&#353;&#237; ven&#269;en&#237;, v&#253;cvik a lep&#353;&#237; kontrolu psa.',solves:'Pom&#225;h&#225; p&#345;i proch&#225;zk&#225;ch, tr&#233;ninku nebo &#345;e&#353;en&#237; chov&#225;n&#237;.',use:'Vyberte spr&#225;vnou velikost a v&#382;dy myslete na pohodl&#237; psa.'};
  }else if(/hrack|kong|wobbler|ring|mic/.test(pageText)){
    fit={label:'Z&#225;bava',title:'Z&#225;bava, pohyb a chytr&#233; zabaven&#237;',intro:'Pro aktivn&#283;j&#353;&#237; den doma i venku.',who:'Pro psy a ko&#269;ky, kte&#345;&#237; pot&#345;ebuj&#237; z&#225;bavu, pohyb nebo stimulaci.',solves:'Pom&#225;h&#225; zabavit mazl&#237;&#269;ka a podpo&#345;it aktivn&#283;j&#353;&#237; tr&#225;ven&#237; &#269;asu.',use:'Pou&#382;&#237;vejte pod dohledem a vyb&#237;rejte podle velikosti mazl&#237;&#269;ka.'};
  }

  var html=
    '<section id="vz-product-upgrade" class="vz-px">'+
      '<div class="vz-px__trust">'+
        '<span><i>&#10003;</i>Odesl&#225;n&#237; do 24 h</span>'+
        '<span><i>&#10003;</i>Doprava zdarma od 999 K&#269;</span>'+
        '<span><i>&#10003;</i>Vr&#225;cen&#237; do 14 dn&#367;</span>'+
      '</div>'+
      '<div class="vz-px__guide">'+
        '<div class="vz-px__top"><em>'+fit.label+'</em><h3>'+fit.title+'</h3><p>'+fit.intro+'</p></div>'+
        '<div class="vz-px__rows">'+
          '<div><strong>Pro koho</strong><span>'+fit.who+'</span></div>'+
          '<div><strong>Co &#345;e&#353;&#237;</strong><span>'+fit.solves+'</span></div>'+
          '<div><strong>Pou&#382;it&#237;</strong><span>'+fit.use+'</span></div>'+
        '</div>'+
      '</div>'+
      '<div class="vz-px__help"><span><b>Nejste si jist&#237; v&#253;b&#283;rem?</b> Porad&#237;me p&#345;ed n&#225;kupem.</span><a href="tel:774318382">774 318 382</a></div>'+
    '</section>';

  addToCart.insertAdjacentHTML('afterend',html);
})();
