import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantDetails } from 'src/app/models/plant-details.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: PlantDetails;

  constructor(private route: ActivatedRoute, private PlantsSrv: PlantsService) { }

  ngOnInit(): void {
    //recupero l'id della pianta
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.fetchData();
    });
  }

  fetchData(): void {
    const sessionData: string | null = sessionStorage.getItem(`plant_${this.id}`);
    const url: string = `https://perenual.com/api/species/details/${this.id}?key=sk-dHP9649015b2500351329`;

    if (sessionData) {
      this.plant = JSON.parse(sessionData);
    } else {
      this.PlantsSrv.getPlant<PlantDetails>(url).subscribe(data => {
        this.plant = data;
        console.log(`${this.plant}\n${this.id}\n${url}`)
        sessionStorage.setItem(`plant_${this.id}`, JSON.stringify(this.plant));
      });
    }
  }
}
