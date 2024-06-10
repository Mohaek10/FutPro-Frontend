import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/account/';

  constructor(private http: HttpClient) {
  }

  getMisJuagdores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}mis-jugadores/`);
  }
}
