import { Component } from '@angular/core';
import { Plants } from 'src/app/models/plants.interface';

@Component({
  selector: 'app-plant-search',
  template: `<main><app-cards [plants]="this.plants" [page]="this.page"></app-cards></main>`,
  styles: ['']
})
export class PlantSearchComponent {
  page: number = 0;
  plants!: Plants[];

  constructor() {
    // recupero dati nel localStorage
    const localData: string | null = localStorage.getItem('page_0');
    if (localData) {
      this.plants = JSON.parse(localData);
    }
  }
}
