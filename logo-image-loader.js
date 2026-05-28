(function(){
  function isHome(){
    var p = window.location.pathname.replace(/\/+$/, '');
    return p === '' || p === '/';
  }

  function addStyle(){
    if(document.getElementById('vz-logo-image-loader-style')) return;
    var s = document.createElement('style');
    s.id = 'vz-logo-image-loader-style';
    s.textContent = [
      '.vz-brand-hero__logo.has-real-logo:before{display:none!important;content:none!important;background-image:none!important}',
      '.vz-brand-hero__logo.has-real-logo{gap:8px!important}',
      '.vz-brand-logo-img{display:block!important;width:100%!important;height:64px!important;max-width:250px!important;object-fit:contain!important;margin:0 auto 8px!important}',
      '.vz-brand-hero__logo--bamboo .vz-brand-logo-img{height:70px!important;max-width:285px!important}',
      '.vz-brand-hero__logo--flamingo .vz-brand-logo-img{height:58px!important;max-width:230px!important}',
      '.vz-brand-hero__logo--lotte .vz-brand-logo-img{height:70px!important;max-width:180px!important}',
      '@media(max-width:768px){.vz-brand-logo-img{height:56px!important}.vz-brand-hero__logo--bamboo .vz-brand-logo-img{height:62px!important}.vz-brand-hero__logo--flamingo .vz-brand-logo-img{height:52px!important}.vz-brand-hero__logo--lotte .vz-brand-logo-img{height:62px!important}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function candidates(name){
    var folders = ['/user/documents/upload/', '/user/documents/upload/Loga/', '/user/documents/upload/loga/'];
    var exts = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];
    var out = [];
    folders.forEach(function(folder){
      exts.forEach(function(ext){
        out.push(folder + name + '.' + ext);
      });
    });
    return out;
  }

  function loadFirst(urls, cb){
    var i = 0;
    function next(){
      if(i >= urls.length){ cb(null); return; }
      var url = urls[i++];
      var img = new Image();
      img.onload = function(){ cb(url); };
      img.onerror = next;
      img.src = url + '?v=2';
    }
    next();
  }

  function putLogo(selector, name, alt){
    var card = document.querySelector(selector);
    if(!card || card.classList.contains('has-real-logo')) return;
    loadFirst(candidates(name), function(url){
      if(!url) return;
      var old = card.querySelector('.vz-brand-logo-img');
      if(old) old.remove();
      var img = document.createElement('img');
      img.className = 'vz-brand-logo-img';
      img.alt = alt;
      img.loading = 'eager';
      img.decoding = 'async';
      img.src = url + '?v=2';
      var span = card.querySelector('span');
      card.insertBefore(img, span || card.firstChild);
      card.classList.add('has-real-logo');
    });
  }

  function run(){
    if(!isHome()) return;
    addStyle();
    putLogo('.vz-brand-hero__logo--flamingo', 'IMG_3981', 'Flamingo Pet Products');
    putLogo('.vz-brand-hero__logo--bamboo', 'IMG_3982', 'Bamboo Groom');
    putLogo('.vz-brand-hero__logo--lotte', 'IMG_3984', 'Designed by Lotte');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
  setTimeout(run, 400);
  setTimeout(run, 1500);
})();
