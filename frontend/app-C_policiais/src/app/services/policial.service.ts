import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policial } from '../models/policial.model';

@Injectable({
  providedIn: 'root'
})
export class PolicialService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  cadastrarPolicial(policial: Policial): Observable<any> {
    return this.http.post(`${this.apiUrl}/policiais`, policial);
  }

  listarPoliciais(filtro?: string): Observable<Policial[]> {
    let params = new HttpParams();
    if (filtro) {
      params = params.set('filtro', filtro);
    }
    return this.http.get<Policial[]>(`${this.apiUrl}/policiais`, { params });
  }
}
