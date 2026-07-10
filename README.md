# vycesano-shoptet

Custom vzhled (CSS/JS/HTML) pro eshop **[vyčesáno.cz](https://www.vycesano.cz/)**
běžící na platformě **Shoptet**.

## Jak to funguje

Soubory z tohoto repa se servírují přes **jsDelivr CDN** a načítají do Shoptetu
přes dva kódy vložené v administraci (**Vzhled a obsah → Editor → HTML kód**):

| Admin sekce | Soubor v repu | Co dělá |
|---|---|---|
| **Záhlaví** (před `</head>`) | [`shoptet-head-code.html`](shoptet-head-code.html) | font + CSS + JS (včetně patičky přes `vz-footer.js`) |
| **Zápatí** (před `</body>`) | [`shoptet-footer-code.html`](shoptet-footer-code.html) | záměrně prázdné (jen komentář) – Shoptet pole má limit 8192 znaků |

Produkce je pinnutá na **git tag** (`@v31`) – immutable reference, kterou
jsDelivr cachuje trvale. Commity do `main` produkci nezmění, dokud se
nevydá nový tag a neupraví URL v admin kódu.

**Release postup:**
1. změny commitnout do `main` (ověřit lokálně přes `.preview/`)
2. `git tag v32 && git push origin main --tags`
3. v admin kódu **Záhlaví** přepsat `@v31` → `@v32` (Zápatí se nemění)

> Failsafe: skrytí nativní Shoptet hlavičky je podmíněné třídou
> `html.vz-ready` (nastavuje ji inline skript v head kódu, watchdog ji
> odebere, když se custom hlavička nevloží). Výpadek CDN/JS tak nenechá
> web bez navigace.

## Přehled souborů (release v30)

**Design systém**
- `tokens.css` – design tokeny (barvy, typografie Manrope, stíny, radiusy) + globální základ. Načítá se první. **Jediný vlastník `:root` a pozadí body.**
- `vz-redesign.css` – produktové karty, nadpisy sekcí, nativní patička. Načítá se poslední.
- `vz-anim.css` + `vz-anim.js` – scroll-reveal animace (failsafe, respektují `prefers-reduced-motion`).

**Hlavička / hero / titulka**
- `header.css` + `header.js` – top bar, hlavička, jediné menu, sidebar kategorií, breadcrumbs. Dřív tu byl `@import` pinnutý na commit `71c0801` – rozpuštěno, celý kód je teď v repu.
- `homepage-hero-inject.js` + `homepage-hero-v2.css` – hero (benefit copy, 2 CTA, trust řádek, 3 kategorie karty, pás značek).
- `hero-assets.js` – foto pes+kočka do pozadí hero + reálná loga značek (přímé URL, žádné 404, fallback při chybě obrázku).
- `vz-trust.js` – sekce „Nakupujte bez starostí" na titulce. **Nahradila smyšlené recenze (reviews.js)** – žádná vymyšlená jména; až budou ověřené recenze (Shoptet/Heureka), patří sem.
- `vz-footer.css` + `vz-footer.js` – zelená patička `.vz-footer` (všechny stránky) + sekce `.vhg` „Co hledáte" (titulka). Markup vkládá JS, protože Shoptet pole Zápatí má limit 8192 znaků.

**Produkt**
- `product.css` + `product.js` – detail produktu (cena, dostupnost, trust chipy, průvodce výběrem, nabídka pomoci). Sidebar vlastní `header.css`.

**Ostatní**
- `assets/brands/` – loga značek (nepoužívají se v hero – ořezané/nekvalitní; hero bere loga z admin uploadů; ponecháno jako záloha).
- `imports/` – datové importy produktů (XML/CSV), netýká se frontendu.
- `.preview/` (negitované) – lokální náhled: stažené živé HTML s vyříznutou starou vrstvou a vloženými aktuálními admin kódy nad lokálními soubory (`python3 -m http.server 4599`).

## Smazáno ve v30 (mrtvý kód / hotfix vrstvy)

`reviews.js` (smyšlené recenze – právní riziko dle EU Omnibus),
`brand-banner.css`, `aaa-logo-kill.css`, `brand-logo-fix.css`
(tři generace hero-logo hacků přebité novějšími vrstvami).

## SEO opravy ve v30

Z head kódu odstraněn `<link rel="canonical" href="https://www.vycesano.cz/">`
(mířil z KAŽDÉ stránky na titulku!) a duplicitní `<meta name="description">` –
Shoptet obojí generuje sám a správně per stránka.

## Známé věci k dořešení v administraci (ne v kódu)

1. **Popis kategorie /proti-linani/** obsahuje escapované HTML – na webu je vidět
   surové `<p>`. Oprav přímo v admin editoru kategorie (vlož text bez HTML tagů).
2. **Práh dopravy zdarma 1 499 Kč** je v kódu jen jako text – ověř, že reálné
   pravidlo v Shoptet administraci je také 1 499 Kč, jinak se údaje rozjedou.
3. **Ověřené recenze** – zapnout Shoptet hodnocení / Heureka „Ověřeno zákazníky"
   a pak je zobrazit místo/vedle sekce `vz-trust`.
