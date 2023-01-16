import { Component } from '@angular/core';
import { Products, Product,Cliente_empresa } from '../shared/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss']
})
export class CreateProductoComponent {

  cliente_empresa: Cliente_empresa =  { id_empresa:Number(), dni_ruc: '',
    razon_social: '',
    nombre_comercial: '',
    reputacion: '',
    fecha_registro: new Date(Date.now())};

product:  Product = {nombre: '', descripcion: '', precio: Number(), precio_fabrica: Number(), cantidad: Number(), descuento: Number(), fecha_registro: new Date(Date.now()),  cliente_empresa:  { id_empresa:6, dni_ruc: '',
razon_social: '',
nombre_comercial: '',
reputacion: '',
fecha_registro: new Date(Date.now())} };

//product: Product;

constructor(
  private productoServicio: ProductService, 
  private router:Router,
  private _auth: AuthService,) { }


nuevoProduct(){

  this._auth

  this.productoServicio.nuevoProducto(this.product).subscribe(
    res=>{
      console.log(res);
      this.router.navigate(['/empresa-producto']);
    },
    err=>console.log(err)
  );
}

}
