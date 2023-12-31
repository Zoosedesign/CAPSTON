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
    // cancello la ricerca precedente se esiste
    const localData: string | null = localStorage.getItem('page_0');
    if (localData) {
      localStorage.removeItem('page_0');
    }

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

    // nel caso non ci siano risultati
    if (this.researchedPlants.length === 0) {
      // do un feedback all'utente
      this.placeholder = 'nessun risultato';
      this.searchWord = '';
      setTimeout(() => {
        this.placeholder = 'plant name';
      }, 2000);
    } else if (this.router.url === '/plants/search') { // se siamo già sulla pagina di ricerca
      localStorage.setItem('page_0', JSON.stringify(this.researchedPlants));
      window.location.reload();
      this.searchWord = '';
    } else { // nel caso ci siano risultati in qualsiasi pagina venga fatta la ricerca
      this.router.navigate(['/plants/search']);
      localStorage.setItem('page_0', JSON.stringify(this.researchedPlants));
      this.searchWord = '';
    }
  }
}
