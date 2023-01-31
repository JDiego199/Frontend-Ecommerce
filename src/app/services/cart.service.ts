import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { ProductService } from './product.service';
import { OrdenDetalles, OrdenDetallesCrear, Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = {
    products: [],
    total: 0,
  };
  producto: Product;
  ordes: OrdenDetalles [] = [{

    id_orden_detalle: Number(),
    precio:Number(),
    cantidad: Number(),
    producto: {
      id_producto: '',
      nombre: '',
      descripcion: '',
      precio: Number(),
      precio_fabrica: Number(),
      cantidad: Number(),
      descuento: Number(),
      fecha_registro: new Date(Date.now()),
      fileList: []
    }
  }];
  lista: OrdenDetalles[]=[];
  crearOrder: OrdenDetallesCrear;
  usuarioId;
  cartDataObs$ = new BehaviorSubject(this.cartData);
  cartdatosO$ = new BehaviorSubject(this.ordes);
total;
  constructor(
    private _notification: NzNotificationService,
    private _api: ApiService,
    private _token: TokenStorageService,
    private  productService: ProductService
  ) {



    this.usuarioId = this._token.getId();
    this.productService.carritoCliente(this.usuarioId).subscribe(
      res => {
        //   this.lista = res;
         //  this.product = res;
         this.ordes = res;
          
          this.cartdatosO$.next({ ...this.ordes });
          localStorage.setItem('cart',JSON.stringify( this.ordes));
         },
         err => console.log(err)
       );

       
    let localCartData = JSON.parse(localStorage.getItem('cart'));
    if (localCartData) this.ordes = Object.values(localCartData);

    

    this.cartdatosO$.next(this.ordes);
    this.cartDataObs$.next(this.cartData);


    
  }


  submitCheckout(orden) {
    this.usuarioId = this._token.getId();
    return this._api.postTypeRequest('api/ordenes/'+this.usuarioId, orden);

  }


  addProduct(params): void {

    const { id, price, quantity, image, title, maxQuantity } = params;
    const product = { id, price, quantity, image, title, maxQuantity };
/***************put para subir la cantidad de ordenes********** */
   /* if (!this.isProductInCart(id)) {
      if (product.quantity) this.cartData.products.push(product);
      else this.cartData.products.push({ ...product, quantity: 1 });
    } else {
      // copy array, find item index and update
      let updatedProducts = [...this.cartData.products];
      let productIndex = updatedProducts.findIndex((prod) => prod.id == id);
      let product = updatedProducts[productIndex];

      // if no quantity, increment
      if (quantity) {
        updatedProducts[productIndex] = {
          ...product,
          quantity: quantity,
        };
      } else {
        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      console.log(updatedProducts);
      this.cartData.products = updatedProducts;
    }*/

       /**************Agregar producto a carrito bd************* */

 
 
    this.usuarioId = this._token.getId();

    //this.crearOrder.id_orden_detalle = null;

    //this.total = product.price*product.quantity;
    this.cartData.total = product.price;
    this.productService.ingresarProductoCarrito(this.usuarioId, product.id, this.crearOrder={cantidad: 1, precio:this.cartData.total }).subscribe(
      res => {
  
      },
      err => console.log(err)
    );
    this.listarOrdenes();
this.cartData.total = Number(this.getCartTotal());
 

    this._notification.create(
      'success',
      'Producto agregado al carrito',
      `${title} fue agrgado al carrito`
    );
    
    this.listarOrdenes();

    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  updateCart(id: number, quantity: number): void {
    // copy array, find item index and update
    let updatedProducts = [...this.cartData.products];
    let productIndex = updatedProducts.findIndex((prod) => prod.id == id);

    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantity: quantity,
    };

    this.cartData.products = updatedProducts;
    this.cartData.total = Number(this.getCartTotal());
   // this.cartDataObs$.next({ ...this.cartData });
    //localStorage.setItem('cart', JSON.stringify(this.cartData));

/****************************** */
    this.listarOrdenes();
}


  

  removeProduct(id: number): void {

    /*let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();*/
    //this.cartdatosO$.next({ ...this.ordes });

  //  localStorage.setItem('cart', JSON.stringify(this.ordes));
  
   //   localStorage.setItem('cart', ())
   //this.listarOrdenes();

    this.productService.eliminarProductoCarrito(id).subscribe(
      res=>{
          
      },
      err=> console.log(err)
    );

    this._notification.create(
      'success',
      'Removed successfully',
      'The selected item was removed from the cart successfully'
    );
    this.cartData.total = Number(this.getCartTotal());

    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.listarOrdenes();
       
          // localStorage.setItem('cart',   this.ordes);
  }

  clearCart(): void {
    this.cartData = {
      products: [],
      total: 0,
    };
    this.getCartTotal();
    this.listarOrdenes();
    //this.cartDataObs$.next({ ...this.cartData });
    //localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): Number {

    this.listarOrdenes();

     let totalSum = 0;
      this.ordes.forEach(
        (prod) => (totalSum += Number(prod.producto.cantidad) *Number( prod.cantidad))
      );
    

  

    return totalSum;
  }

  isProductInCart(id: string): boolean {

    //this.lista.findIndex((producto)=> producto.producto.id_producto === id)
    return     this.lista.findIndex((producto)=> producto.producto.id_producto === id) !== -1;

  }

  listarOrdenes(){
    this.usuarioId = this._token.getId();
    this.productService.carritoCliente(this.usuarioId).subscribe(
      res => {
        //   this.lista = res;
         //  this.product = res;
         this.ordes = res;

          this.cartdatosO$.next({ ...this.ordes });
          localStorage.setItem('cart',JSON.stringify( this.ordes));
         },
         err => console.log(err)
       );
  }
 /* agregarProductoCarrito(){
    this.usuarioId = this._token.getId();
    this.ordes.precio = pro;
    this.ordes.cantidad = 1;
    this.productService.ingresarProductoCarrito(this.usuarioId, this.cartData.products[0].id_producto, this.ordes).subscribe(
      res=>{

      }
    )
  }*/
  
}
