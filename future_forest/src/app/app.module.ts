// area moduli
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// area componenti
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { PlantsComponent } from './pages/plants/plants.component';
import { XeriscapingComponent } from './pages/xeriscaping/xeriscaping.component';
import { HomeComponent } from './pages/home/home.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { OurMissionComponent } from './components/our-mission/our-mission.component';
import { OurPlantsComponent } from './components/our-plants/our-plants.component';
import { ScrollAnchorDirective } from './services/scroll-anchor.directive';
import { ScrollManagerDirective } from './services/scroll-manager.directive';
import { ScrollSectionDirective } from './services/scroll-section.directive';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'plants',
    component: PlantsComponent
  },
  {
    path: 'xeriscaping',
    component: XeriscapingComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    PlantsComponent,
    XeriscapingComponent,
    HomeComponent,
    WhoWeAreComponent,
    OurMissionComponent,
    OurPlantsComponent,
    ScrollAnchorDirective,
    ScrollManagerDirective,
    ScrollSectionDirective
  ],
  imports: [
    BrowserModule,
    // https://angular.io/api/router/ExtraOptions opzioni extra router module
    RouterModule.forRoot(
      routes, {
        enableTracing: false,
        anchorScrolling: 'enabled',
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
