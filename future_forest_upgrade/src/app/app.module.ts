// area moduli
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//importo il routing
import { AppRoutingModule } from './app-routing.module';

// modulo necessario per l'import HostListener nel component card
import { CommonModule } from '@angular/common';

// area componenti
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { PlantsComponent } from './pages/plants/plants.component';
import { XeriscapingComponent } from './pages/xeriscaping/xeriscaping.component';
import { HomeComponent } from './pages/home/home.component';
import { OurPlantsComponent } from './components/our-plants/our-plants.component';
// direttive per gestione e funzionamento scroll
import { ScrollAnchorDirective } from './services/scroll-anchor.directive';
import { ScrollManagerDirective } from './services/scroll-manager.directive';
import { ScrollSectionDirective } from './services/scroll-section.directive';
import { BeforeAfterComponent } from './components/before-after/before-after.component';
import { PlantDetailsComponent } from './pages/plant-details/plant-details.component';
import { CardsComponent } from './components/cards/cards.component';
import { PlantSearchComponent } from './pages/plant-search/plant-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    PlantsComponent,
    XeriscapingComponent,
    HomeComponent,
    OurPlantsComponent,
    ScrollAnchorDirective,
    ScrollManagerDirective,
    ScrollSectionDirective,
    BeforeAfterComponent,
    PlantDetailsComponent,
    CardsComponent,
    PlantSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
