import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination.interface';
import { Plants } from 'src/app/models/plants.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  page!: number;
  halfPage!: number;
  plants!: Plants[];

  constructor(private PlantsSrv: PlantsService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    //verifico l'ultima pagina navigata
    const actualPage: string | null = localStorage.getItem('actual_page');
    if (actualPage) {
      this.page = Number(actualPage);
      this.halfPage = Math.ceil(Number(actualPage) / 2);
    } else {
      this.page = 1;
      this.halfPage = 0;
    }

    //faccio la get solo se non sono già presenti nel local storage i dati della pagina richiesta
    const localData: string | null = localStorage.getItem(`page_${this.page}`);
    let url: string = `https://perenual.com/api/species-list?page=${this.page}&key=sk-nSiB649d9c7d4c4e31432&watering=minimum&sunlight=full_sun`
    if (localData) {
      this.plants = JSON.parse(localData);
    } else {
      this.PlantsSrv.getPlant<Pagination>(url).subscribe(page => {
        // Filtraggio dell'array page.data
        const filteredData: Plants[] = page.data.filter(plant => {
          const defaultImage: any = plant.default_image;
          const originalUrl: string = defaultImage?.original_url;

          // Restituisco true se default_image non è null o original_url non è l'immagine specificata"
          return defaultImage !== null && originalUrl !== "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg";
        });

        // Limito l'array filtrato a un massimo di 24 elementi
        const slicedData: Plants[] = filteredData.slice(0, 24);

        // Calcola il numero di elementi mancanti per arrivare a 24
        const nummissingPlants: number = 24 - slicedData.length;

        // prendo gli elementi mancanti dall'inizio dell'array
        const missingPlants: Plants[] = filteredData.slice(0, nummissingPlants);

        this.plants = slicedData.concat(missingPlants);
        localStorage.setItem(`page_${this.page}`, JSON.stringify(this.plants));
      });
    }
  }

  //-------- PAGE NAVIGATION --------
  pagePlus(): void {
    this.page++;
    localStorage.setItem('actual_page', JSON.stringify(this.page));
    this.fetchData();
  }

  pageLess(): void {
    this.page--;
    localStorage.setItem(`actual_page`, JSON.stringify(this.page));
    this.fetchData();
  }

  pageChoice(p: number): void {
    this.page = p
    localStorage.setItem('actual_page', JSON.stringify(this.page));
    this.fetchData();
  }
}
