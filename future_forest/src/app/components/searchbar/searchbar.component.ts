import { Component, OnInit, Input } from '@angular/core';
import { Plants } from 'src/app/models/plants.interface';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  searchWord!: string;
  @Input() researchedPlants: Plants[] = [];

  constructor() { }

  ngOnInit(): void {
  }

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
  }
}
