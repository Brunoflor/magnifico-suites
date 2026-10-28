# Magnifico Suites

**Libro di benvenuto digitale per gli ospiti di Magnifico Suites**, camere a Roma in Via Lorenzo Il Magnifico, vicino alla stazione Tiburtina.

Una sola pagina, pensata per il telefono. L’ospite tocca un’icona e apre la scheda: posizione, camere, servizi, dintorni, contatti. Il pulsante Indietro riporta alla griglia.

La guida è in italiano (lingua predefinita), inglese, spagnolo, francese, tedesco, portoghese, cinese semplificato, giapponese e arabo. All’apertura segue la lingua del browser, se è tra queste; altrimenti resta l’italiano. La scelta viene ricordata. L’arabo è da destra a sinistra, con il layout specchiato. Se manca una frase in una lingua, la pagina usa l’inglese.

Non c’è musica e non c’è un passaggio di build: i file nella radice del repository sono il sito.

## Struttura

- `index.html` — pagina unica, menu delle lingue, animazione di apertura, griglia e scheda
- `styles.css` — aspetto (fondo chiaro, lilla, denim, blu ardesia, terracotta)
- `app.js` — griglia, schede, lingue, animazione
- `content.js` — tutti i testi per gli ospiti
- `icons/` — logo e icone SVG
- `images/` — fotografie delle camere, già ridotte per il web
- `favicon.svg` — segno dell’arco
- `.nojekyll` — GitHub Pages non deve ignorare file o cartelle il cui nome inizia con `_`

## Modificare i testi

Tutto ciò che legge l’ospite sta in [`content.js`](content.js). Si cambia una frase, si salva, si aggiorna.

Ogni frase è un oggetto con un campo per lingua: `it`, `en`, `es`, `fr`, `de`, `pt`, `zh`, `ja`, `ar`. Se una lingua manca, la pagina mostra l’inglese.

- Una sezione **notes** (check-in, Wi-Fi, regole, servizi, contatti…) resta su «In arrivo» finché non si aggiungono `paragraphs`, ciascuno un oggetto lingua. I contatti usano anche `links` (`href`, `label`, `value`).
- Una sezione **places** (ristoranti, bar, shopping, attività, camere) resta su «In arrivo» finché `items` è vuoto. Ogni scheda ha `name`, `address`, `text` e, se serve, `mapsUrl`. Le camere non hanno il link alla mappa. Il parcheggio può avere solo un `notice`: il resto resta «In arrivo».
- Una sezione **directions** (la posizione) mostra l’indirizzo e il pulsante di Google Maps. `routes` si riempie solo quando i percorsi sono verificati.

Si aggiungono soltanto dati controllati: niente password, orari, prezzi, distanze o numeri di telefono inventati.

Le fotografie stanno in `photos`. La prima è anche l’immagine grande della home: se si cambia file, va aggiornato anche `src` dell’immagine in `index.html`.

## Versione e cache del telefono

I telefoni tengono in cache CSS e JavaScript. Dopo ogni modifica a `styles.css`, `app.js` o `content.js` va alzato il numero di versione, lo stesso in tutti i punti di `index.html`:

- `window.MAGNIFICO_VERSION`
- il foglio di stile, `content.js` e `app.js` (`?v=…`)
- il logo in preload e nell’animazione
- la fotografia della home

`app.js` aggiunge lo stesso `?v=` alle icone e alle foto caricate dopo. Senza un numero nuovo, l’ospite può continuare a vedere la guida vecchia.

## Anteprima in locale

```bash
python3 -m http.server 8000
```

Poi aprire [http://localhost:8000](http://localhost:8000). Si può anche aprire `index.html` direttamente nel browser.

## Pubblicazione

Il sito è pronto per GitHub Pages dalla radice del repository: percorsi relativi e file `.nojekyll`. Questa guida non attiva GitHub Pages e non modifica le impostazioni del repository.

Link previsto, attivo dopo la pubblicazione: https://brunoflor.github.io/magnifico-suites/

## Stato

Prima versione. Check-in, Wi-Fi, dettagli del parcheggio, regole, trasporti, ristoranti, bar, shopping, emergenze e check-out sono segnati come «In arrivo».
