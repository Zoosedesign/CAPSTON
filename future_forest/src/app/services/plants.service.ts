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
  imgZoom(imgUrl: string, tagId: string): void {
    const container = document.getElementById(tagId) as HTMLElement;
    const img = new Image() as HTMLImageElement;

    img.src = imgUrl;

    img.onload = () => {
      // Calcola il rapporto altezza/larghezza dell'immagine
      const size: number = img.naturalHeight / img.naturalWidth;
      const zoomFactor: number = 1.5; // Fattore di zoom desiderato
      const percentage: string = size * zoomFactor * 100 + '%'; // Moltiplica per il fattore di zoom

      container.style.height = percentage;

      container.onmousemove = event => {
        // Ottiene le dimensioni e la posizione dell'elemento container
        const box = (event.target as HTMLElement)?.getBoundingClientRect();
        // Calcola la posizione orizzontale(x) e verticale(y) del mouse all'interno dell'elemento container
        const xPos: number = event.clientX - box.left;
        const yPos: number = event.clientY - box.top;
        const xPercent: string = xPos / (container.clientWidth / 100) + '%';
        const yPercent: string = yPos / ((container.clientWidth * size * zoomFactor) / 100) + '%';

         // Modifica le proprietà CSS per spostare lo sfondo dell'immagine in base alla posizione del mouse
        Object.assign(container.style, {
          backgroundPosition: `${xPercent} ${yPercent}`,
          backgroundSize: img.naturalWidth * zoomFactor + 'px' // Moltiplica per il fattore di zoom
        });
      };

      // Ripristino dimensioni immagine
      container.onmouseleave = () => {
        Object.assign(container.style, {
          backgroundSize: 'cover'
        });
      };
    };
  }

}
