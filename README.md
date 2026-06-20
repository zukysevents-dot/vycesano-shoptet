# vycesano-shoptet

Custom vzhled (CSS/JS/HTML) pro eshop **[vyčesáno.cz](https://www.vycesano.cz/)**
běžící na platformě **Shoptet**.

## Jak to funguje

Soubory z tohoto repa se servírují přes **jsDelivr CDN** a načítají do Shoptetu
přes dva kódy vložené v administraci (**Vzhled a obsah → Editor → HTML kód**):

| Admin sekce | Soubor v repu | Co dělá |
|---|---|---|
| **Záhlaví** (před `</head>`) | [`shoptet-head-code.html`](shoptet-head-code.html) | načítá CSS/JS + inline brand karty |
| **Zápatí** (před `</body>`) | [`shoptet-footer-code.html`](shoptet-footer-code.html) | zelená patička `.vz-footer` + sekce `.vhg` |

`@main` = vždy aktuální verze z GitHubu. Parametr `?v=NN` v URL slouží k vynucení
nové verze (jsDelivr i prohlížeč jinak drží cache i několik hodin).

> ⚠️ Po změně souborů v repu se projeví na webu až po vyprázdnění jsDelivr cache
> (minuty–hodiny) nebo po bumpnutí `?v=NN` v admin kódu.

## Přehled souborů

**Design systém a redesign vrstva**
- `tokens.css` – design tokeny (barvy, typografie, stíny, radiusy). Načítá se první.
- `vz-redesign.css` – redesign vrstva (produktové karty, nadpisy, úklid duplicit). Načítá se poslední.
- `vz-anim.css` + `vz-anim.js` – jemné scroll-reveal animace (failsafe, respektují `prefers-reduced-motion`).

**Hlavička / produkt / hero**
- `header.css` + `header.js` – vlastní hlavička (top bar, menu, social).
- `product.css` + `product.js` – produktová stránka (info box, sidebar, CTA).
- `homepage-hero-v2.css` + `homepage-hero-inject.js` – hero na titulce.
- `hero-assets.js` – hero pozadí + loga značek z přímých URL (nahradil `logo-image-loader.js` a `hero-pet-fast-v2.js`).
- `brand-banner.css`, `aaa-logo-kill.css`, `brand-logo-fix.css` – styling hero / loga značek.

**Ostatní**
- `assets/brands/` – loga značek (beeztees, petsafe, animology).
- `imports/` – datové importy produktů (XML/CSV), netýká se frontendu.
