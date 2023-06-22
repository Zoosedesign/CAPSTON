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
}
