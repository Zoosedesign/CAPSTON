import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient) { }

  // metto <type> per utilizzare il metodo con diversi oggetti
  getPlant<type>(url: string): Observable<type> {
    return this.http.get<type>(`${url}`);
  }

  // ----------- ZOOM IMMAGINE --------------
  imgZoom(tagId: string): void {
    const container = document.getElementById(tagId) as HTMLElement;

    const zoomFactor: number = 1.5; // Fattore di zoom desiderato

    container.onmousemove = event => {
      // Ottiene le dimensioni e la posizione dell'elemento container
      const box: DOMRect = container.getBoundingClientRect();
      // Calcola la posizione orizzontale(x) e verticale(y) del mouse all'interno del container
      const xPos: number = event.clientX - box.left;
      const yPos: number = event.clientY - box.top;
      const xPercent: string = xPos / (container.clientWidth / 100) + '%';
      const yPercent: string = yPos / ((container.clientHeight) / 100) + '%';

      // Modifica le proprietà CSS per spostare lo sfondo dell'immagine in base alla posizione del mouse
      Object.assign(container.style, {
        backgroundPosition: `${xPercent} ${yPercent}`,
        ...(container.offsetWidth >= container.offsetHeight
          ? { backgroundSize: container.offsetWidth * zoomFactor + 'px' }
          : { backgroundSize: container.offsetHeight * zoomFactor + 'px' }
        )
      });
    };

    // Ripristino dimensioni immagine
    container.onmouseleave = (): void => {
      Object.assign(container.style, {
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      });
    };
  }

  // ----------- RANDOM --------------
  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}
