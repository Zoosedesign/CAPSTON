import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

// interfacce
import { PlantDetails } from 'src/app/models/plant-details.interface';
import { Plants } from 'src/app/models/plants.interface';
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
  page!: number;
  plant!: PlantDetails;
  plant_image!: string;
  plants!: Plants[];


  constructor(private route: ActivatedRoute, private PlantsSrv: PlantsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // recupero l'id della pianta
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.page = Number(params.get('pageNumber'));
      this.fetchData();
      this.zoomPlant();
    });
  }

  //----------- RECUPERO DETTAGLI PIANTE --------------
  fetchData(): void {
    const actualPage: string | null = localStorage.getItem(`page_${this.page}`);
    const pageData: Plants[] = JSON.parse(actualPage!);

    //----------- IMMAGINE PIANTA --------------
    const actualPlant: Plants = pageData.find((plant: Plants) => plant.id === this.id)!;
    this.plant_image = actualPlant.default_image.regular_url || actualPlant.default_image.original_url;

    //----------- DATI PIANTA --------------
    // recupero dati nel localStorage
    const localData: string | null = localStorage.getItem(`plant_${this.id}`);

    const url: string = `https://perenual.com/api/species/details/${this.id}?key=${environment.APItoken}`;

    if (localData) {
      this.plant = JSON.parse(localData);
    } else {
      this.PlantsSrv.getPlant<PlantDetails>(url).subscribe(data => {
        this.plant = data;

        localStorage.setItem(`plant_${this.id}`, JSON.stringify(this.plant));
      });
    }

    //----------- PIANTE EXTRA --------------
    const randomPlants: Plants[] = this.PlantsSrv.shuffleArray<Plants>(pageData)
      .filter((plant: Plants) => plant.id !== this.id)
      .slice(0, 4);

    this.plants = randomPlants;
  }

  //----------- ZOOM IMMAGINE --------------
  zoomPlant(): void {
    this.PlantsSrv.imgZoom('product');
  }

  //----------- GET SAFE IFRAME URL --------------
  getSafeUrl(iframeUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }
}
