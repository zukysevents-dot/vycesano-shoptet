// Vycesano.cz – social ikony v horní liště
(function () {
  var FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61589413723529';
  var INSTAGRAM_URL = 'https://www.instagram.com/vycesano.cz/';

  function buildIcons() {
    var wrapper = document.createElement('span');
    wrapper.className = 'vyc-social-top';
    wrapper.setAttribute('aria-label', 'Vyčesáno.cz sociální sítě');

    wrapper.innerHTML =
      '<a class="vyc-social-top__link" href="' + FACEBOOK_URL + '" target="_blank" rel="noopener noreferrer" aria-label="Facebook Vyčesáno.cz">' +
        '<svg class="vyc-social-top__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>' +
        '</svg>' +
      '</a>' +
      '<a class="vyc-social-top__link" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram Vyčesáno.cz">' +
        '<svg class="vyc-social-top__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z"/>' +
        '</svg>' +
      '</a>';

    return wrapper;
  }

  function findTopBarTarget() {
    var selectors = [
      '.top-navigation-bar .container',
      '.top-navigation-bar',
      '#topNavigation',
      '#header .top-navigation-bar',
      'header .top-navigation-bar'
    ];

    for (var i = 0; i < selectors.length; i++) {
      var node = document.querySelector(selectors[i]);
      if (node) return node;
    }

    var phoneLinks = Array.prototype.slice.call(document.querySelectorAll('a[href^="tel:"], .tel, .phone'));
    for (var j = 0; j < phoneLinks.length; j++) {
      var text = (phoneLinks[j].textContent || '').replace(/\s+/g, ' ').trim();
      if (text.indexOf('774') !== -1 || text.indexOf('318') !== -1) return phoneLinks[j].parentNode;
    }

    return null;
  }

  function insertIcons() {
    if (document.querySelector('.vyc-social-top')) return true;

    var target = findTopBarTarget();
    if (!target) return false;

    target.appendChild(buildIcons());
    return true;
  }

  function boot() {
    if (insertIcons()) return;

    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      if (insertIcons() || tries >= 20) {
        window.clearInterval(timer);
      }
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
