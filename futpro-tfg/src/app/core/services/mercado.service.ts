import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jugador} from "../../shared/models/jugador.models";

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  private apiUrl = 'http://localhost:8000/api/ventas/';

  constructor(private http: HttpClient) {
  }

  getJugadoresMercadoSistema(search?: string, filters?: any, page: number = 1, pageSize: number = 10): Observable<{
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
    const endPoints = this.apiUrl.concat('mercado-sistema/')
    return this.http.get<{
      count: number,
      next: string | null,
      previous: string | null,
      results: Jugador[]
    }>(endPoints, {params});
  }

  getMercadoUsuario(search?: string, filters?: any, page: number = 1, pageSize: number = 10): Observable<{
    count: number,
    next: string | null,
    previous: string | null,
    results: any[]
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
    const endPoints = this.apiUrl.concat('mercado-usuarios/')
    return this.http.get<{
      count: number,
      next: string | null,
      previous: string | null,
      results: any[]
    }>(endPoints, {params});
  }

  comprarJugadorSistema(jugador_id: number, cantidad: number): Observable<any> {
    const endPoints = this.apiUrl.concat('comprar-sistema/');
    return this.http.post(endPoints, {jugador_id, cantidad});
  }

  ponerEnVenta(jugadorUsuarioId: number, cantidad: number, precio: number): Observable<any> {
    const endPoints = this.apiUrl.concat('poner-en-venta/');
    return this.http.post(endPoints, {jugador_usuario: jugadorUsuarioId, cantidad, precio});
  }

  comprarJugadorUsuario(ventaId: number, cantidad: number): Observable<any> {
    const endPoints = this.apiUrl.concat(`comprar-usuario/${ventaId}/`);
    return this.http.post(endPoints, {cantidad});
  }
}
