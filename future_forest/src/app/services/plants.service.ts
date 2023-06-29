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

    const zoomFactor: number = 2; // Fattore di zoom desiderato

    container.onmousemove = event => {
      // Ottiene le dimensioni e la posizione dell'elemento container
      const box: DOMRect = container.getBoundingClientRect();
      // Calcola la posizione orizzontale(x) e verticale(y) del mouse all'interno del container
      const xPos: number = event.clientX - box.left;
      const yPos: number = event.clientY - box.top;
      const xPercent: string = xPos / (container.clientWidth / 100) + '%';
      const yPercent: string = yPos / ((container.clientWidth * zoomFactor) / 100) + '%';

      // Modifica le proprietà CSS per spostare lo sfondo dell'immagine in base alla posizione del mouse
      Object.assign(container.style, {
        backgroundPosition: `${xPercent} ${yPercent}`,
        backgroundSize: container.offsetWidth * zoomFactor + 'px'
      });
    };

    // Ripristino dimensioni immagine
    container.onmouseleave = (): void => {
      Object.assign(container.style, {
        backgroundSize: 'cover'
      });
    };
  }

}
