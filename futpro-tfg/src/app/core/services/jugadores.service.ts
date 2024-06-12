import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Jugador} from '../../shared/models/jugador.models';
import {Comentario} from "../../shared/models/comentario.models";

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private apiUrl = 'http://localhost:8000/api/jugadores/';

  constructor(private http: HttpClient) {
  }

  getJugadores(search?: string, filters?: any, page: number = 1, pageSize: number = 10): Observable<{
    count: number,
    next: string | null,
    previous: string | null,
    results: Jugador[]
  }> {
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
    params = params.set('limit', pageSize.toString());
    params = params.set('offset', ((page - 1) * pageSize).toString());
    return this.http.get<{
      count: number,
      next: string | null,
      previous: string | null,
      results: Jugador[]
    }>(this.apiUrl, {params});
  }


  getJugador(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}${id}/`);
  }

  createJugador(jugador: Jugador, imagen: File): Observable<Jugador> {
    const formData = new FormData();
    formData.append('nombreCompleto', jugador.nombreCompleto);
    formData.append('edad', jugador.edad.toString());
    formData.append('equipo', jugador.equipo.toString());
    formData.append('media', jugador.media.toString());
    formData.append('rareza', jugador.rareza);
    formData.append('imagen', imagen);
    formData.append('valor', jugador.valor.toString());
    formData.append('posicion', jugador.posicion);
    formData.append('en_mercado', jugador.en_mercado.toString());
    formData.append('isActive', jugador.isActive.toString());

    return this.http.post<Jugador>(this.apiUrl, formData);
  }

  updateJugador(id: number, jugador: Jugador, imagen?: File | null): Observable<Jugador> {
    const formData = new FormData();
    formData.append('nombreCompleto', jugador.nombreCompleto);
    formData.append('edad', jugador.edad.toString());
    formData.append('equipo', jugador.equipo.toString());
    formData.append('media', jugador.media.toString());
    formData.append('rareza', jugador.rareza);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    formData.append('valor', jugador.valor.toString());
    formData.append('posicion', jugador.posicion);
    formData.append('en_mercado', jugador.en_mercado.toString());
    formData.append('isActive', jugador.isActive.toString());

    return this.http.put<Jugador>(`${this.apiUrl}${id}/`, formData);
  }


  deleteJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  createComentario(jugadorId: number, comentario: Comentario): Observable<Comentario> {
    const url = `http://localhost:8000/api/jugador/${jugadorId}/comentario-create`;
    return this.http.post<Comentario>(url, comentario);
  }
}
