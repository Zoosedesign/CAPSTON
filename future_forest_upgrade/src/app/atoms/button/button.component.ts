import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<a [routerLink]="buttonUrl" [fragment]="anchorTag"
    class="btn bg-200 text-extra rounded-pill border border-bottom-0 border-5 border-100 px-md-3 py-md-2 shadow">&#62;&nbsp;{{buttonText}}&nbsp;&#60;</a>`,
  styles: [``]
})

export class ButtonComponent implements OnInit {
  @Input() buttonUrl!: string;
  @Input() buttonText!: string;
  @Input() anchorTag?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
