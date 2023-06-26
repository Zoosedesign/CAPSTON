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

# IMAGE PLANT ERROR
Avendo riscontrato problemi, errori e mancanze di immagini all'interno di alcune piante ho implementato la logica con un operatorio ternario per il recupero dell'immagine:

 <img src="{{(plant.default_image) ? plant.default_image.small_url || plant.default_image.original_url : '/assets/img/img_placeholder.svg'}}" alt="{{plant.common_name}} image">

 Prima di tutto controllo se l'array [plant.defaul_image] esiste dopodichè gli dico di inserire [plant.default_image.small_url], qual'ora non ci fosse optare per la versione [original_url], solo nel caso [plant.default_image] risulti vuoto o null inserisci l'immagine riempitiva creata.

