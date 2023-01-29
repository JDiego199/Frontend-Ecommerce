import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { ProductService } from './product.service';
import { OrdenDetalles } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = {
    products: [],
    total: 0,
  };
  ordes: OrdenDetalles = {
    id_orden_detalle: Number(),
    precio:Number(),
    cantidad: Number()
  };
  usuarioId;
  cartDataObs$ = new BehaviorSubject(this.cartData);

  constructor(
    private _notification: NzNotificationService,
    private _api: ApiService,
    private _token: TokenStorageService,
    private  productService: ProductService
  ) {
    let localCartData = JSON.parse(localStorage.getItem('cart'));
    if (localCartData) this.cartData = localCartData;

    this.cartDataObs$.next(this.cartData);
  }

  submitCheckout(userId, cart) {
    return this._api.postTypeRequest('orders/create', {
      userId: userId,
      cart: cart,
    });
  }

  addProduct(params): void {
    const { id, price, quantity, image, title, maxQuantity } = params;
    const product = { id, price, quantity, image, title, maxQuantity };

    if (!this.isProductInCart(id)) {
      if (quantity) this.cartData.products.push(product);
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
    }

       /**************Agregar producto a carrito bd************* */
    this.usuarioId = this._token.getId();
    this.ordes.cantidad = 1;
    this.ordes.precio = product.price;  
    this.productService.ingresarProductoCarrito(this.usuarioId, product.id, this.ordes).subscribe(
      res => {
        console.log(res);
  
      },
      err => console.log(err)
    );

    this.cartData.total = this.getCartTotal();

    this._notification.create(
      'success',
      'Product added to cart',
      `${title} was successfully added to the cart`
    );
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
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    console.log(this.cartData.products);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  removeProduct(id: number): void {
    console.log( );
    let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));

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
  }

  clearCart(): void {
    this.cartData = {
      products: [],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod) => (totalSum += prod.price * prod.quantity)
    );

    return totalSum;
  }

  isProductInCart(id: number): boolean {
    return this.cartData.products.findIndex((prod) => prod.id === id) !== -1;
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
