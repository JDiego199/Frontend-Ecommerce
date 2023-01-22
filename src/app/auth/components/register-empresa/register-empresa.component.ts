import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Cliente_empresa, Cliente, Roles } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.scss']
})
export class RegisterEmpresaComponent  {



    

  cliente_empresa: Cliente_empresa = {
    id_empresa: Number(), 
    dni_ruc: '',
    razon_social: '',
    nombre_comercial: '',
    reputacion: '',
    fecha_registro: new Date(Date.now()),

  };
  cliente: Cliente = {
    id_cliente:Number(),
    nombre: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    fecha_registro: new Date(Date.now()),
    password: '',
    userName: '',
    roles: [{
      id: 1,
      "rolNombre": "ROLE_EMPRESA"
    }]
  }


  errorMessage = '';
  loading = false;
  userId ;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private _token: TokenStorageService
  ) {}

  ngOnInit(): void {

    let id = this._token.getId();
    this.userId = id;
    console.log(this.userId);

  }


  nuevoClienteEmp() {


    this._auth.cambiarRol(this.cliente,this.userId).subscribe(
      res => {
        console.log(res);

       //this._router.navigate(['/']);
      },
      err => console.log(err)
    );
 

    this._auth.clienteEmpresa(this.cliente_empresa,this.userId).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/']);
      },
      err => console.log(err)
    );

 
  }



  
}
