import { Component, OnInit } from '@angular/core';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-xeriscaping',
  templateUrl: './xeriscaping.component.html',
  styleUrls: ['./xeriscaping.component.scss']
})
export class XeriscapingComponent implements OnInit {

  constructor(private PlantsSrv: PlantsService) { }

  ngOnInit(): void {
    this.PlantsSrv.imgZoom('garden');
  }
}
