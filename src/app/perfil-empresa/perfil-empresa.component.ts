import { Component, OnInit } from '@angular/core';
import { Cliente, Roles } from '../shared/models/product.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ResolveStart } from '@angular/router';
@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent  implements OnInit{

  roless: Roles ={
    id: Number(),
    rolNombre: ''
  }

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

  constructor(   private _token: TokenStorageService, private authservice: AuthService) {

    

}
  ngOnInit(): void {
this.userId = this._token.getId();
    this.authservice.getClienteById(this.userId).subscribe(
      res => {
     //   this.lista = res;
      //  this.product = res;
      this.cliente = res;

       console.log(res);

      },
      err => console.log(err)
    );

  }


}