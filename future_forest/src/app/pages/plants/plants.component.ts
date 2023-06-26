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
  page: number = 1
  url: string = `https://perenual.com/api/species-list?page=${this.page}&key=sk-dHP9649015b2500351329&watering=minimum&sunlight=full_sun`
  plants!: Plants[];

  constructor(private PlantsSrv: PlantsService) { }

  ngOnInit(): void {
    //faccio la get solo se non sono già presenti nel session storage i dati della pagina richiesta
    let sessionData: string | null = sessionStorage.getItem(`page_${this.page}`);
    if (sessionData) {
      this.plants = JSON.parse(sessionData);
    } else {
      this.PlantsSrv.getPlant<Pagination>(this.url).subscribe(page => {
        this.plants = page.data;
        sessionStorage.setItem(`page_${this.page}`, JSON.stringify(this.plants));
      });
    }
  }
}
