import { Component, Input } from '@angular/core';
import { Plants } from 'src/app/models/plants.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @Input() plants!: Plants[];
  @Input() page!: number;
}
