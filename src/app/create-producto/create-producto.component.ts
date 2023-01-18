import { Component } from '@angular/core';
import { Products, Product } from '../shared/models/product.model';
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


  product: Product = {
    nombre: '', 
    descripcion: '', 
    precio: Number(), 
    precio_fabrica: Number(), 
    cantidad: Number(), 
    descuento: Number(), 
    fecha_registro: new Date(Date.now()),
  };


  //product: Product;
  userId;
  constructor(
    private productoServicio: ProductService,
    private router: Router,
    private _auth: AuthService,
    private _token: TokenStorageService
  ) { }


  ngOnInit(): void {

    let id = this._token.getId();
    this.userId = id;
    console.log(this.userId);

  }


  nuevoProduct() {

    this._auth

    this.productoServicio.nuevoProducto(this.product, this.userId).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/empresa-producto']);
      },
      err => console.log(err)
    );
  }

}
