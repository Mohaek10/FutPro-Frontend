import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipo} from "../../shared/models/equipo.models";

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private apiUrl = 'http://localhost:8000/api/equipos/';

  constructor(private http: HttpClient) {
  }

  getEquipos(search?: string, page: number = 1, pageSize: number = 9999999): Observable<{
    count: number,
    next: string | null,
    previous: string | null,
    results: Equipo[]
  }> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    params = params.set('limit', pageSize.toString());
    params = params.set('offset', ((page - 1) * pageSize).toString());
    return this.http.get<{
      count: number,
      next: string | null,
      previous: string | null,
      results: Equipo[]
    }>(this.apiUrl, {params});
  }

  getEquipo(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}${id}/`);
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, equipo);
  }

  updateEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}${id}/`, equipo);
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
