import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-before-after',
  template: `
    <figure id="before" class="mb-0" [style.backgroundImage]="'url(' + beforeImageUrl + ')'" >
      <div id="after" [style.backgroundImage]="'url(' + afterImageUrl + ')'" ></div>
      <input type="range" min="0" max="100" value="67" id="range" (input)="moveDivisor()">
    </figure>`,
  styleUrls: ['./before-after.component.scss']
})
export class BeforeAfterComponent {
  @Input() beforeImageUrl!: string;
  @Input() afterImageUrl!: string;

  moveDivisor() {
    const afterImage = document.getElementById('after') as HTMLElement;
    const range = document.getElementById('range') as HTMLInputElement;
    //imposto la larghezza dell'immagine in base all'input range
    afterImage.style.width = range.value + '%';
  }
}
