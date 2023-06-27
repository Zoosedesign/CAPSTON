# FUTURE FOREST --------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11.


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

# IMAGE PLANT ERROR --------------------
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

