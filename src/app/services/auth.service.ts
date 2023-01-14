import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private _api: ApiService, private _token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', credentials)
      .pipe(
        map((res: any) => {
          let user = {
            email: credentials.email,
            token: res.token,
            role: res.authorities[0].authority
          };
        
          this._token.setToken(res.token);
          this._token.setUser(res.nombreUsuario);
          this._token.setRole(res.authorities[0].authority)

          
          
          console.log(res.authorities[0].authority);
       //   console.log(res);
          this.userSubject.next(user.role);
          console.log(user);
          return user;
        })
      );
  }

  register(user: any): Observable<any> {
    return this._api.postTypeRequest('auth/register', user);
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
