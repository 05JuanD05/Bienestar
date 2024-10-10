import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private apiUrl = 'http://localhost:3000/periodos';

  constructor(private http: HttpClient) {}

  obtenerPeriodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/periodos`);
  }

  agregarPeriodo(periodo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/periodos`, periodo);
  }

  eliminarPeriodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/periodos/${id}`);
  }
}
