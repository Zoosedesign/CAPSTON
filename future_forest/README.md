# FutureForest --------------------
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11.


# API Perenual --------------------
300 API Request / Day
[DOCUMENTATION:] https://perenual.com/docs/api
[ENDPOINT:] https://perenual.com/api/species-list?page=1&key=sk-dHP9649015b2500351329&watering=minimum&sunlight=full_sun


# Scroll Features --------------------
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
