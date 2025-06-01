import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://crud-api-wj2g.onrender.com/api/staff/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  storeUserSession(token: string, name: string, role: string): void {
    const userSession = { token, name, role };
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userSession');
  }

  logout(): void {
    sessionStorage.removeItem('userSession');
  }

  getUserInfo(): { name: string | null; role: string | null } {
    const userSession = sessionStorage.getItem('userSession');
    return userSession ? JSON.parse(userSession) : { name: null, role: null };
  }
}
