import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantDetails } from 'src/app/models/plant-details.interface';
import { PlantsService } from 'src/app/services/plants.service';

// import necessario per caricare gli iframe
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: PlantDetails;

  constructor(private route: ActivatedRoute, private PlantsSrv: PlantsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    //recupero l'id della pianta
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.fetchData();
    });
  }

  fetchData(): void {
    const localData: string | null = localStorage.getItem(`plant_${this.id}`);
    const url: string = `https://perenual.com/api/species/details/${this.id}?key=sk-dHP9649015b2500351329`;

    if (localData) {
      this.plant = JSON.parse(localData);
      this.zoomPlant();
    } else {
      this.PlantsSrv.getPlant<PlantDetails>(url).subscribe(data => {
        this.plant = data;

        localStorage.setItem(`plant_${this.id}`, JSON.stringify(this.plant));
        this.zoomPlant();
      });
    }
  }

  // ----------- ZOOM IMMAGINE --------------
  zoomPlant(): void {
  this.PlantsSrv.imgZoom('product');
  }

  getSafeUrl(iframe: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframe);
  }

}
