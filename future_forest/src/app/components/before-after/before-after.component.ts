import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-after',
  template: `
    <figure id="before" class="mb-0" [style.backgroundImage]="'url(' + beforeImageUrl + ')'" >
      <div id="after" [style.backgroundImage]="'url(' + afterImageUrl + ')'" ></div>
      <input type="range" min="0" max="100" value="{{this.rangeValue}}" id="range" (input)="moveDivisor()">
    </figure>`,
  styleUrls: ['./before-after.component.scss']
})
export class BeforeAfterComponent implements OnInit {
  @Input() beforeImageUrl!: string;
  @Input() afterImageUrl!: string;

  rangeValue!: number;

  ngOnInit(): void {
    this.moveRange();
  }

  moveDivisor(): void {
    const afterImage = document.getElementById('after') as HTMLElement;
    const range = document.getElementById('range') as HTMLInputElement;
    //imposto la larghezza dell'immagine in base all'input range
    afterImage.style.width = range.value + '%';
  }

  moveRange(): void {
    this.rangeValue = 67;
    const afterElement = document.getElementById('after') as HTMLElement;

    //animazione verso sinistra
    let moveLeftExecuted: boolean = false;
    const moveLeft: NodeJS.Timeout = setInterval(() => {
      if (!moveLeftExecuted) {
        if (this.rangeValue > 37) {
          this.rangeValue--;
          afterElement.style.width = `${this.rangeValue}vw`;
        } else {
          clearInterval(moveLeft);
          moveLeftExecuted = true;

          // animazione fino al 75% del keyframes
          let moveRightExecuted: boolean = false;
          const moveRight: NodeJS.Timeout = setInterval(() => {
            if (!moveRightExecuted) {
              if (this.rangeValue < 97) {
                this.rangeValue++;
                afterElement.style.width = `${this.rangeValue}vw`;
              } else {
                clearInterval(moveRight);
                moveRightExecuted = true;

                // animazione fino al 100% del keyframes
                const moveStartPosition: NodeJS.Timeout = setInterval(() => {
                  if (this.rangeValue > 67) {
                    this.rangeValue--;
                    afterElement.style.width = `${this.rangeValue}vw`;
                  } else {
                    clearInterval(moveStartPosition);
                  }
                }, 20)
              }
            }
          }, 20);
        }
      }
    }, 20);
  }
}
