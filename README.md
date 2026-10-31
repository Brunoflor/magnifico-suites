# Magnifico Suites

**Libro di benvenuto digitale per gli ospiti di Magnifico Suites**, camere a Roma in Via Lorenzo Il Magnifico, vicino alla stazione Tiburtina.

Una sola pagina, pensata per il telefono. In alto: logo, «Libro di benvenuto», nome, indirizzo apribile in Google Maps. Sotto, quattro scorciatoie (Wi-Fi, check-in, contatti su WhatsApp, posizione), la galleria fotografica e la griglia delle sezioni. Toccando un’icona si apre una scheda dal basso, con Indietro, titolo e menu della lingua. Le foto si aprono a tutto schermo, con didascalia, precedente, successiva e chiudi.

La guida è in italiano (se il browser non è tra le lingue previste), inglese, spagnolo, francese, tedesco, portoghese, cinese semplificato, giapponese e arabo. All’apertura segue la lingua del browser, se è tra queste, e la scelta viene ricordata. L’arabo è da destra a sinistra. Se manca una frase, la pagina usa l’inglese.

L’animazione iniziale compare una volta per sessione e non parte se il sistema chiede di ridurre il movimento. Non c’è musica e non c’è un passaggio di build.

## Struttura della pagina

1. Animazione di apertura con il logo
2. Intestazione: lingua, logo, occhiello, nome, indirizzo, e — solo se gli orari sono veri — check-in e check-out
3. Riga rapida: Wi-Fi, Check-in, Contatti (WhatsApp), Posizione
4. Galleria con lightbox
5. Griglia della guida
6. Scheda dal basso
7. Piè di pagina: disegno a linea di Roma, contatti e CIN
8. Pulsante per tornare su e avviso breve («toast»)

File:

- `index.html` — pagina, collegamenti con `?v=`, meta `ms-version`
- `styles.css` — aspetto (fondo chiaro, lilla, denim, blu ardesia, terracotta)
- `app.js` — lingue, schede, galleria, lightbox
- `content.js` — tutti i testi per gli ospiti
- `icons/` — logo, icone, disegno del piede e icone PWA
- `images/` — fotografie in WebP
- `manifest.webmanifest` — scheda per «Aggiungi a Home»
- `favicon.svg`
- `.nojekyll` — GitHub Pages non deve ignorare i nomi che iniziano con `_`

## Modificare i testi

Tutto ciò che legge l’ospite sta in [`content.js`](content.js).

Ogni frase è un oggetto con un campo per lingua: `it`, `en`, `es`, `fr`, `de`, `pt`, `zh`, `ja`, `ar`. Se una lingua manca, la pagina mostra l’inglese.

- Una sezione **notes** resta su «In arrivo» finché `paragraphs` è vuoto. I contatti usano anche `links`.
- Una sezione **places** resta su «In arrivo» finché `items` è vuoto. Ogni scheda ha `name`, `address`, `text` e, se serve, `mapsUrl`. Il parcheggio può avere solo un `notice`.
- Una sezione **directions** mostra l’indirizzo e il pulsante della mappa. `routes` si riempie solo con percorsi verificati.
- `photos` è la galleria in home. Ogni foto ha `src`, `width`, `height` e `alt`.
- `property.checkin` e `property.checkout` sono orari facoltativi. Si scrivono solo se sono confermati. Se manca uno dei due, la riga degli orari sotto l’indirizzo non compare.

Si aggiungono soltanto dati controllati: niente password, orari, prezzi, distanze o numeri di telefono inventati.

## Versione e cache del telefono

Dopo ogni modifica a `styles.css`, `app.js` o `content.js` va alzato lo stesso numero in `index.html`:

- `window.MAGNIFICO_VERSION`
- il meta `ms-version`
- `?v=` su CSS, `content.js`, `app.js`, logo e disegno del piede

`app.js` aggiunge lo stesso `?v=` a icone e foto caricate dopo.

## Anteprima in locale

```bash
python3 -m http.server 8000
```

Poi aprire [http://localhost:8000](http://localhost:8000).

## Pubblicazione

Il sito è servito da GitHub Pages dalla radice del repository (percorsi relativi e `.nojekyll`). Questa guida non modifica le impostazioni di Pages.

Indirizzo: https://brunoflor.github.io/magnifico-suites/

## Stato

Check-in, Wi-Fi, dettagli del parcheggio, regole, trasporti, ristoranti, bar, shopping, emergenze e check-out restano «In arrivo». Gli orari di check-in e check-out non sono in pagina, perché non sono ancora confermati.
