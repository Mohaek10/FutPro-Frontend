import {Injectable} from '@angular/core';
import {User} from "../../shared/models/user.models";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/account/';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, {email, password})
      .pipe(tap(response => {
        if (response.token) {
          const user: User = {
            email: response.email,
            username: response.username,
            first_name: response.first_name,
            last_name: response.last_name,
            phone_number: response.phone_number,
            futcoins: response.futcoins,
            date_joined: new Date(response.date_joined),
            is_admin: response.is_admin,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('accessToken', response.token.access);
          localStorage.setItem('refreshToken', response.token.refresh);
          this.currentUserSubject.next(user);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.http.post(`${this.apiUrl}logout/`, {}).subscribe();
    this.router.navigate(['/login']);
  }

  getTokens() {
    return {
      access: localStorage.getItem('accessToken'),
      refresh: localStorage.getItem('refreshToken')
    };
  }

  isAuthenticated(): boolean {
    return this.getTokens().access !== null && this.currentUserValue !== null && this.currentUserValue.email !== '';
  }

  isTokenExpired(): boolean {
    const token = this.getTokens().access;
    if (token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      const isExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;
      console.log('Esta caducado el token? Metodo isExpired en auth.service: ' + isExpired);
      return isExpired;
    }
    return true;
  }

  getToken(): string | null {
    return this.getTokens().access;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  checkAdminStatus(): Observable<boolean> {
    const url = `${this.apiUrl}check-admin-status/`;
    return this.http.get<{ is_admin: boolean }>(url, {headers: this.getAuthHeaders()}).pipe(
      map(response => response.is_admin)
    );
  }

  isAdmin(): Observable<boolean> {
    return this.checkAdminStatus();
  }


}
