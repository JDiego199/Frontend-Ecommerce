import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  ROLE = 'auth-role';
  ID = 'auth-id';

  constructor() {}

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getRole(): String {
    return JSON.parse(sessionStorage.getItem(this.ROLE));
  }

  setRole(role: String): void {
    sessionStorage.removeItem(this.ROLE);
    sessionStorage.setItem(this.ROLE, JSON.stringify(role));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  setUser(user): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getId(): any {
    return JSON.parse(sessionStorage.getItem(this.ID));
  }

  setId(id): void {
    sessionStorage.removeItem(this.ID);
    sessionStorage.setItem(this.ID, JSON.stringify(id));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }


}
