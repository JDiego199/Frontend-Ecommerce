import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Cliente, Cliente_empresa } from '../shared/models/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  cliente: Cliente = {
    id_cliente: Number(),
    nombre: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    fecha_registro: new Date(),
    userName: '',
    password:'',
    roles: [],
  }

  userId;

  isrole = true;
  cliente_empresa: Cliente_empresa = {
  
    id_empresa: Number(),
    dni_ruc: '',
    razon_social: '',
    nombre_comercial: '',
    reputacion: '',
    fecha_registro: new Date
   
}


constructor(   private _token: TokenStorageService, private authservice: AuthService) {


}
ngOnInit(): void {

  this.userId = this._token.getId();

  if(this._token.getRole() == "ROLE_EMPRESA"){

    this.isrole = true;
  
  }else{

    this.isrole = false;

  }




  this.authservice.getClienteById(this.userId).subscribe(
    res => {
   //   this.lista = res;
    //  this.product = res;
    this.cliente = res;


    },
    err => console.log(err)
  );

  this.authservice.getClienteEmperesaById(this.userId).subscribe(
    res => {
   //   this.lista = res;
    //  this.product = res;
    this.cliente_empresa = res;

     console.log(res);

    },
    err => console.log(err)
  );

}



  }

