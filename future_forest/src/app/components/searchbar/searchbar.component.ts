import { Component } from '@angular/core';
import { Plants } from 'src/app/models/plants.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styles: ['']
})
export class SearchbarComponent {
  placeholder: string = 'plant name'
  searchWord!: string;
  researchedPlants: Plants[] = [];

  constructor(private router: Router) { }

  search(): void {
    //recupero il termine di ricerca immesso dall'utente
    const searchValue: string = this.searchWord.toLowerCase().trim();

    //recupero tutte le chiavi nel Local Storage e le filtro
    const storageKeys: string[] = Object.keys(localStorage);
    const plantsPages: string[] = storageKeys.filter(key => key.startsWith('page_'));

    const mergedData: Plants[] = [];

    //unisco gli oggetti/piante di ogni pagina trovata
    plantsPages.forEach(page => {
      const item: string | null = localStorage.getItem(page)!;
      const plantsPage: Plants[] = JSON.parse(item);
      mergedData.push(...plantsPage);
    });

    // definisco le piante ricercate suddividendo le stringhe delle proprietà utili, anche nel caso di match parziali
    this.researchedPlants = mergedData.filter(plant =>
      plant.common_name.toLowerCase().split(' ').some(word => word.includes(searchValue)) ||
      plant.scientific_name.flatMap(names => names.toLowerCase().split(' ')).some(word => word.includes(searchValue))
    );

    console.log(this.researchedPlants);

    if (this.researchedPlants.length === 0) {
      this.placeholder = 'nessun risultato';
    } else {
      this.router.navigate(['/plants/search']);
      localStorage.setItem('page_0', JSON.stringify(this.researchedPlants));
    }
  }
}
