import { Component, OnInit } from '@angular/core';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-xeriscaping',
  templateUrl: './xeriscaping.component.html',
  styleUrls: ['./xeriscaping.component.scss']
})
export class XeriscapingComponent implements OnInit {
  plantsPage!: string

  constructor(private PlantsSrv: PlantsService) {
    this.setPage();
  }

  ngOnInit(): void {
    this.PlantsSrv.imgZoom('garden');
  }

  //recupero l'ultima pagina visitata per il link al catalogo piante
  setPage(): void {
    const actualPage: string | null = localStorage.getItem('actual_page');
    this.plantsPage = actualPage ? actualPage : '1';
  }
}
