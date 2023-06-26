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
    const actualPage: string | null = sessionStorage.getItem('actual_page');
    if (actualPage) {
      this.page = Number(actualPage);
      this.halfPage = Math.ceil(Number(actualPage) / 2);
    } else {
      this.page = 1;
      this.halfPage = 0;
    }

    //faccio la get solo se non sono già presenti nel session storage i dati della pagina richiesta
    const sessionData: string | null = sessionStorage.getItem(`page_${this.page}`);
    let url: string = `https://perenual.com/api/species-list?page=${this.page}&key=sk-dHP9649015b2500351329&watering=minimum&sunlight=full_sun`
    if (sessionData) {
      this.plants = JSON.parse(sessionData);
    } else {
      this.PlantsSrv.getPlant<Pagination>(url).subscribe(page => {
        //aggiungo l'array recuperato + i primi due oggetti per riempimento griglia card xxl
        this.plants = [...page.data, page.data[0], page.data[1]];
        sessionStorage.setItem(`page_${this.page}`, JSON.stringify(this.plants));
      });
    }
  }

  //-------- PAGE NAVIGATION --------
  pagePlus(): void {
    this.page++;
    sessionStorage.setItem('actual_page', JSON.stringify(this.page));
    this.fetchData();
  }

  pageLess(): void {
    this.page--;
    sessionStorage.setItem(`actual_page`, JSON.stringify(this.page));
    this.fetchData();
  }

  pageChoice(p: number): void {
    this.page = p
    sessionStorage.setItem('actual_page', JSON.stringify(this.page));
    this.fetchData();
  }
}
