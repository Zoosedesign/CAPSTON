import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// interfacce
import { Pagination } from 'src/app/models/pagination.interface';
import { Plants } from 'src/app/models/plants.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  page: number = 1;
  halfPage!: number;
  plants!: Plants[];

  constructor(private PlantsSrv: PlantsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // verifico l'ultima pagina navigata
    const actualPage: string | null = localStorage.getItem('actual_page');
    if (actualPage) {
      this.page = Number(actualPage);
      this.halfPage = Math.ceil(Number(actualPage) / 2);
    } else {
      this.page = 1;
      this.halfPage = 0;
    }

    // verifico che l'url riporti la pagina corretta
    this.router.navigate(['/plants/page', this.page], { fragment: 'header' });

    //-------- RECUPERO LE PIANTE --------
    // faccio la get solo se non sono già presenti nel local storage i dati della pagina richiesta
    const localData: string | null = localStorage.getItem(`page_${this.page}`);
    const url: string = `https://perenual.com/api/species-list?page=${this.page}&key=${environment.APItoken}&watering=minimum&sunlight=full_sun`

    if (localData) {
      this.plants = JSON.parse(localData);
    } else {
      this.PlantsSrv.getPlant<Pagination>(url).subscribe(page => {
        // Filtraggio dell'array page.data
        this.plants = this.PlantsSrv.APIfilter(page.data);
        // Inserimento nel LocalStorage
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
