import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-after',
  template: `
    <figure id="before" class="mb-0" [style.backgroundImage]="'url(' + beforeImageUrl + ')'" >
      <div id="after" [style.backgroundImage]="'url(' + afterImageUrl + ')'" ></div>
      <input type="range" min="1" max="99" value="50" id="range" (input)="moveDivisor()">
    </figure>

      `,
  styleUrls: ['./before-after.component.scss']
})
export class BeforeAfterComponent implements OnInit {
  @Input() beforeImageUrl!: string;
  @Input() afterImageUrl!: string;

  constructor() { }

  ngOnInit(): void { }

  moveDivisor() {
    const afterImage = document.getElementById('after') as HTMLElement;
    const range = document.getElementById('range') as HTMLInputElement;
    //imposto la larghezza dell'immagine in base all'input range
    afterImage.style.width = range.value + '%';
  }
}
