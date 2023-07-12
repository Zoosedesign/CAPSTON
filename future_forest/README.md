# FUTURE FOREST --------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11.

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


# PAGINATION API LIMIT --------------------
Purtroppo Perenual nella versione FREE blocca la visione dei contenuti a pagina 17

# SEARCH --------------------
Visto che l'API avrebbe eseguito troppe chiamate per fare una ricerca generale, perchè per ogni parola immessa avrebbe recuperato una singola pagina così per come è strutturata, ho dovuto trovare un modo alternativo per recuperare più piante possibili senza effettuare delle chiamate. 

Sono andato quindi a recuperare dalle pagine salvate nel local storage tutte le pagine visitate per unire tutte le piante in un singolo array da filtrare. <nel LocalStorage è poi salvato come "page_0">.
