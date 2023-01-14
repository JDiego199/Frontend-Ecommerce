import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;
  userName = this.email;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    } else {
      this._auth
        .login({ userName: this.email, password: this.password })
        .subscribe(
          (res) => {
            this.loading = false;
           if(res.role =='ROLE_USER'){
            this._router.navigate(['/']);
           }else{
           this._router.navigate(['/']);
           }
       
          },
          (err) => {
            console.log(err);
            this.error = err.error.message;
            this.loading = false;
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
