import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Cliente, Cliente_empresa } from '../shared/models/product.model';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { NzUploadFile } from 'ng-zorro-antd/upload';


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
  };
  fileList: NzUploadFile[] = [

  ];
  userId;

  isrole = true;
  cliente_empresa: Cliente_empresa = {
    id_empresa: Number(),
    dni_ruc: '',
    razon_social: '',
    nombre_comercial: '',
    reputacion: '',
    fecha_registro: new Date,
    fileList: []
};


constructor(   private _token: TokenStorageService, private authservice: AuthService) {


}
ngOnInit(): void {
  this.userId = this._token.getId();
  this.cliente_empresa.fileList[0] = "00s";
  this.authservice.editarClienteEmpresa( this.cliente_empresa, this.userId).subscribe(
    res => {
      //   this.lista = res;
       //  this.product = res;
  
   
        console.log(res);
   
       },
       err => console.log(err)
   );
  console.log(this.cliente_empresa);

 // this.cliente_empresa.fileList[0] = "00s";
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
     console.log( this.cliente_empresa);

    },
    err => console.log(err)
  );


}
cargarImagen(){
  this.cliente_empresa.fileList[0] =   this.croppedImage ;
  this.authservice.editarClienteEmpresa( this.cliente_empresa, this.userId).subscribe(
    res => {
      //   this.lista = res;
       //  this.product = res;
  
   
        console.log(res);
   
       },
       err => console.log(err)
   );
}


/*/************************************* */
imageChangedEvent:string;
croppedImage: string;

fileChangeEvent(event: string): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

   // this.cliente_empresa.fileList[0] =   this.croppedImage ;
 // this.cliente_empresa.fileList[0] = "00s";
 
}
imageLoaded() {
 
    // show cropper
}
cropperReady() {
  this.cliente_empresa.fileList[0] =   this.croppedImage ;
  this.authservice.editarClienteEmpresa( this.cliente_empresa, this.userId).subscribe(
    res => {
      //   this.lista = res;
       //  this.product = res;
  
   
        console.log(res);
   
       },
       err => console.log(err)
   );
}
loadImageFailed() {
    // show message
}



  }

