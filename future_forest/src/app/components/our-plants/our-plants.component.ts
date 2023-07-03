import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

// interfacce
import { Pagination } from 'src/app/models/pagination.interface';
import { Plants } from 'src/app/models/plants.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-our-plants',
  templateUrl: './our-plants.component.html',
  styleUrls: ['./our-plants.component.scss']
})
export class OurPlantsComponent implements OnInit {
  plants!: Plants[];
  plantsPage!: string

  constructor(private PlantsSrv: PlantsService) {
    this.setPage();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  //recupero l'ultima pagina visitata per il link al catalogo piante
  setPage(): void {
    const actualPage: string | null = localStorage.getItem('actual_page');
    this.plantsPage = actualPage ? actualPage : '1';
  }

  fetchData(): void {
  //-------- RECUPERO LE PIANTE --------
    // faccio la get solo se non sono già presenti nel local storage i dati della pagina richiesta
    const localData: string | null = localStorage.getItem(`page_1`);
    const url: string = `https://perenual.com/api/species-list?page=1&key=${environment.APItoken}&watering=minimum&sunlight=full_sun`

    if (localData) {
      this.plants = JSON.parse(localData);
    } else {
      this.PlantsSrv.getPlant<Pagination>(url).subscribe(page => {
        // Filtraggio dell'array page.data
        this.plants = this.PlantsSrv.APIfilter(page.data);
        // Inserimento nel LocalStorage
        localStorage.setItem(`page_1`, JSON.stringify(this.plants));
      });
    }
  }
}
