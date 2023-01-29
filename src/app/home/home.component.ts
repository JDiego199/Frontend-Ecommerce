import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} 
from '@angular/core';

import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product, Cliente_empresa, OrdenDetalles } from '../shared/models/product.model';
import { Route } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  cliente_empresa: Cliente_empresa [] = [];

  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  ordenes: OrdenDetalles;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private _token: TokenStorageService,

  ) {}

  public screenWidth: any;
  public screenHeight: any;
  userId;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.userId = this._token.getId;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    this.tiendas();
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }

  tiendas(){
    this.authService.getClienteEmperesa().subscribe(
      (res: any) => {
        console.log(res);
        this.cliente_empresa = res;
      },


    );
  }

 

}
