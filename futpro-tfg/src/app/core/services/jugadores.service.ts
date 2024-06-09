import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Jugador} from '../../shared/models/jugador.models';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private apiUrl = 'http://localhost:8000/api/jugadores/';

  constructor(private http: HttpClient) {
  }

  getJugadores(search?: string, filters?: any): Observable<{ count: number, results: Jugador[] }> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<{ count: number, results: Jugador[] }>(this.apiUrl, {params});
  }

  getJugador(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}${id}/`);
  }
}
