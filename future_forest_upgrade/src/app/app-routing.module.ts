import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import componenti presenti nella costante "routes
import { HomeComponent } from './pages/home/home.component';
import { XeriscapingComponent } from './pages/xeriscaping/xeriscaping.component';
import { PlantsComponent } from './pages/plants/plants.component';
import { PlantDetailsComponent } from './pages/plant-details/plant-details.component';
import { PlantSearchComponent } from './pages/plant-search/plant-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'xeriscaping',
    component: XeriscapingComponent,
    pathMatch: 'full'
  },
  {
    path: 'plants/page/:pageNumber',
    component: PlantsComponent
  },
  {
    path: 'plants/:pageNumber/:id',
    component: PlantDetailsComponent
  },
  {
    path: 'plants/search',
    component: PlantSearchComponent
  },
  {
    path: '**', //per tutte le altre rotte non definite
    component: HomeComponent,
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        enableTracing: false,
        anchorScrolling: 'enabled',
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
