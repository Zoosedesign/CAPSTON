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
  url: string = "https://perenual.com/api/species-list?page=2&key=sk-dHP9649015b2500351329&watering=minimum&sunlight=full_sun"
  plants!: Plants[];

  constructor(private PlantsSrv: PlantsService) { }

  ngOnInit(): void {
    this.PlantsSrv.getPlant<Pagination>(this.url).subscribe(page => {
      this.plants = page.data;
    });
  }
}
