import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plants } from '../models/plants.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient) { }

  // metto <type> per utilizzare il metodo con diversi oggetti
  getPlant<type>(url: string): Observable<type> {
    return this.http.get<type>(`${url}`);
  }

  // ----------- API FILTER --------------
  APIfilter(array: Plants[]): Plants[] {
    // Filtraggio dell'array page.data
    const filteredData: Plants[] = array.filter(plant => {
      const defaultImage: any = plant.default_image;
      const originalUrl: string = defaultImage?.original_url;

      // Restituisco true se default_image non è null o original_url non è l'immagine specificata"
      return defaultImage !== null && originalUrl !== "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg" && originalUrl !== "https://perenual.com/storage/image/upgrade_access.jpg";
    });

    // Limito l'array filtrato a un massimo di 24 elementi
    const slicedData: Plants[] = filteredData.slice(0, 24);

    // Calcola il numero di elementi mancanti per arrivare a 24
    const nummissingPlants: number = 24 - slicedData.length;

    // prendo gli elementi mancanti dall'inizio dell'array
    const missingPlants: Plants[] = filteredData.slice(0, nummissingPlants);

    return slicedData.concat(missingPlants);
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
