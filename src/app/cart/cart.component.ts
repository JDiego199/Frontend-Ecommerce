import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { OrdenDetalles, Product } from '../shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any;

  product: Product [] =[ {
    id_producto: '',
    nombre: '', 
    descripcion: '', 
    precio: Number(), 
    precio_fabrica: Number(), 
    cantidad: Number(), 
    descuento: Number(), 
    fecha_registro: new Date(Date.now()),
    fileList: []
  }];
  
/*ordenesDetalles: OrdenDetalles [] = [{
  producto: this.product,
  cantidad: Number(),
  precio: Number()

}];*/
lista: OrdenDetalles[]=[];
userId;
  constructor(private _cart: CartService, private ordenesDestallesService: ProductService, private _token: TokenStorageService) {
    this.userId = this._token.getId();
    this.ordenesDestallesService.carritoCliente(this.userId).subscribe(
      res => {
        //   this.lista = res;
         //  this.product = res;
         this.lista = res;
          console.log(this.lista);
          
   
         },
         err => console.log(err)
       );
    
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log(cartData);


    });




  }

  ngOnInit(): void {

    this.userId = this._token.getId();
    this.listarOrdenes()


  }

  updateCart(id: number, quantity: number): void {
    console.log({ id, quantity });
    this._cart.updateCart(id, quantity);
  }

  removeCartItem(id: number): void {
    this._cart.removeProduct(id);
  }

  listarOrdenes(){

    this.ordenesDestallesService.carritoCliente(this.userId).subscribe(
      res => {
        //   this.lista = res;
         //  this.product = res;
         this.lista = res;
          console.log(this.lista);
          
   
         },
         err => console.log(err)
       );
  }

}
