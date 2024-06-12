import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoteFutCoins} from "../../shared/models/lote-futcoins.models";
import {User} from "../../shared/models/user.models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/account/';

  constructor(private http: HttpClient) {
  }

  getMisJuagdores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}mis-jugadores/?limit=1000`);
  }


  getLotesFutCoins(): Observable<{ results: LoteFutCoins[] }> {
    return this.http.get<{ results: LoteFutCoins[] }>(`${this.apiUrl}lotes-futcoins/`);
  }

  comprarFutCoins(compraData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}comprar-futcoins/`, compraData);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}user/me/`);
  }

  updateUserProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}user/me/`, data);
  }
}
