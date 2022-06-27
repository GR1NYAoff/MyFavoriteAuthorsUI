import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/token';
import { LoginRequest } from '../models/loginRequest';

export const ACCESS_TOKEN_KEY = 'app_access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {}

  login(data: LoginRequest): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.apiUrl}api/Account/login`, data)
      .pipe(
        tap((token) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        })
      );
  }

  register(data: LoginRequest): any {
    return this.httpClient.post(`${this.apiUrl}api/Account/reg`, data);
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !this.jwtHelperService.isTokenExpired(token!);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['home']);
  }
}
