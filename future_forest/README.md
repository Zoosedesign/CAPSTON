# FUTURE FOREST --------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11.
- API: Perenual free, only 300 Request / Day
- TYPESCRIPT: only custom algorithm;
- LIBRARY: nothing;
- SCSS: my personal zoosedesign style + Bootstrap v5.3;
- IMG: made by me, with Adobe Photoshop.

# TOKEN --------------------
Il token è inserito all'interno dell'environment.ts, per cambiarlo basta sovrascriverlo li, per crearne uno nuovo per raggiunto limiti API, andare su: [https://perenual.com/docs/api].

# LESS IS MORE & BETTER --------------------
Ho cercato di ottimizzarlo il più possibile, annullando quasi completamento la ripetizione di codice e componenti, in modo da renderlo più reattivo e meno pesante, anche grazie alla non aggiunta di nessun componente e ragionando il più possibile con il LocalStorage.


# ONLY CUSTOM DESIGN --------------------
Ogni elemento presente, dall'immagine prima e dopo, alla paginazione, ai vari effetti di scroll e zoom sono tutti stati creati senza l'importazione di librerie grafiche esterne oltre al classico CSS di bootstrap, in modo da diminuire la pesantezza della SPA aumentandone allo stesso tempo la reattività.


# IMPROVE CHARGE SPEED --------------------
Per aumentare la velocità di caricamento della pagina piante, nella sezione home OurPlant, viene già caricato il primo array e il service di filtro dei dati dell'Api, in modo da velocizzare ulteriormente il recupero dei dati dall'Api.


# API PERENUAL --------------------
300 API Request / Day
[DOCUMENTATION:] https://perenual.com/docs/api
[ENDPOINT:] https://perenual.com/api/species-list?page=1&key=sk-dHP9649015b2500351329&watering=minimum&sunlight=full_sun


# SCROLL FEATURES --------------------
1.[src/app/services]
creazione delle 3 direttive necessarie all'utilizzo dello scroll

2.[src/app/app.module.ts]
import delle 3 direttive per renderle funzionanti

3.[app.component.html]
inserimento del <div appScrollManager><div> contenitore area di smooth scroll

4.[src/app/pages/home/home.component.html]
mettiamo le sezioni in cui punterano i link di area, dei sostituti ai classici anchor tag, si dovrà scrivere: <appScrollSection="mission">

5.[src/app/shared/header/header.component.html]
inserimento degli [appScrollAnchor="mission"] che permettono nella pagina attualmente visualizzata, di permettere lo scroll verso <appScrollSection="mission">, in questo caso.

Avendo l'appScrollManager in app.component.html, per resettare lo scroll i link dovranno avere in aggiunta il campo [fragment=""], in modo che carichi la pagina all'inizio del body, l'header avrà quindi un id classico specifico.

I link saranno quindi:
<routerLink="/" fragment="header" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">


# LAZYLOADING --------------------
Per ottimizzare il caricamento nella pagina delle card ho realizzato un lazy loading che al caricamento della pagina mostra solo le prime 8 piante, cioè le card visualizzate al massimo nelle 100vh.

Le suddette avranno come tag img: <src={{plant.default_image.small_url ? plant.default_image.small_url : plant.default_image.original_url}}>
Mentre tutte le altre 16 in lazy loading avranno: <attr.data-src={{plant.default_image.small_url ? plant.default_image.small_url : plant.default_image.original_url}}>

In questo modo le ultime 16 non verranno mai caricate con la pagina ma solo dopo uno scroll di 100px che sostituirà [attr.data-src] con [src]


# IMAGE PLANT ERROR FILTER --------------------
Avendo riscontrato problemi, errori, immagini casuali o mancanti all'interno di alcune piante ho implementato la logica filtrando l'array:

Nel TS qualora [defaultImage] sia null, o l'immagine sia il placeholder erroneo dell'API, la pianta non verrà inserita nell'array. 

 1. Gli array delle pagine essendo ora di numero casuale, imposto un limite a 24 elementi. 
 <const slicedData = filteredData.slice(0,24);>

 2. Nel caso fossero meno di 24, recupero quanti oggetti mancano.
 <const nummissingPlants = 24 - slicedData.length;>
 
 4. Ripeto gli elementi iniziali dell'array, per quanti elementi servono al raggiungimento dei 24.
 <const missingPlants = filteredData.slice(0,nummissingPlants);>

 5. Unisco l'array filtrato con gli eventuali oggetti mancanti.
 <this.plants= slicedData.concat(missingPlants);>


# IMG DETTAGLIO PIANTA --------------------
Non troverete nessuna immagine nella interface del dettaglio pianta, perchè viene recuperata dal local storage, dalla Get precedentemente fatta della pagina del catalogo, che conteneva la pianta su cui si stanno indagando le specifiche.

Il tutto per aumentare la velocità, visto che l'API del dettaglio è già bella corposa di suo.


# PAGINATION API LIMIT --------------------
Purtroppo Perenual nella versione FREE blocca la visione dei contenuti a pagina 17


# SEARCH --------------------
Visto che l'API avrebbe eseguito troppe chiamate per fare una ricerca generale, perchè per ogni parola immessa avrebbe recuperato una singola pagina così per come è strutturata, ho dovuto trovare un modo alternativo per recuperare più piante possibili senza effettuare delle chiamate. 

Sono andato quindi a recuperare dalle pagine salvate nel local storage tutte le pagine visitate per unire tutte le piante in un singolo array da filtrare. <nel LocalStorage è poi salvato come "page_0">.

Inoltre ragionando sempre con il LocalStorage, la velocità di caricamento sarà sempre superiore ad una get verso l'API.
