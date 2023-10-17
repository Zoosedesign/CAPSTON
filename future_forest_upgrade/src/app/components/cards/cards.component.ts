import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Plants } from 'src/app/models/plants.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() plants!: Plants[];
  @Input() page!: number;

  constructor() { }

  ngOnInit(): void {
    this.activeLazyLoad();
  }

  //per evitare glitch del lazy loading nel caso di ritorno alla pagina oltre ai 100vh
  ngAfterViewInit(): void {
    this.activeLazyLoad();
  }

  //----------- LAZY LOADING --------------
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // ottengo il valore di partenza di scroll su tutti i browser
    const scrollOffset: number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollOffset >= 100) {
      this.activeLazyLoad();
    }
  }

  activeLazyLoad() {
    const img = document.querySelectorAll('.lazy-load') as NodeListOf<HTMLImageElement>;
    img.forEach((image: HTMLImageElement) => {
      const imageUrl: string | null = image.getAttribute('data-src');
      if (imageUrl) {
        image.src = imageUrl;
        image.removeAttribute('data-src');
      }
    });
  }
}
