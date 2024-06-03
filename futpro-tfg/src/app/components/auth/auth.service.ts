import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, pipe} from "rxjs";
import {Account} from "../../models/account.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  private currentUserSubject: BehaviorSubject<Account | null>;
  public currentUser: Observable<Account | null>;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Account | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Account | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/account/login/`, {email, password})
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/register/`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue?.token.access;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}

