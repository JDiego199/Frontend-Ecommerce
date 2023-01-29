import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { OrdenDetalles } from '../shared/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  isLoggedIn = false;
  isLoggedInRol = false;
  dropdownVisible = false;
  dropdownVisibleEmp = false; 
  cartData: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768) this.isMobile = false;
    else this.isMobile = true;
  }
  lista: OrdenDetalles[]=[];
userId;
  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private ordenesDestallesService: ProductService
  ) {
    this.getScreenSize();
    this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;

      if (user && this._token.getRole() == "ROLE_EMPRESA"){
        this.isLoggedInRol = true;
      }else{  this.isLoggedInRol = false;}

    });
    this.userId = this._token.getId();
    this.ordenesDestallesService.carritoCliente(this.userId).subscribe(
      res => {
        //   this.lista = res;
         //  this.product = res;
         this.lista = res;
          console.log(this.lista[0].id_orden_detalle);
          

          
   
         },
         err => console.log(err)
       );

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;


    });
  }

  ngOnInit(): void {
    if (this._token.getUser()) this.isLoggedIn = true;
    else this.isLoggedIn = false;


    if (this._token.getUser() && this._token.getRole() == "ROLE_EMPRESA"){
      this.isLoggedInRol = true;
    }else{  this.isLoggedInRol = false;}
  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  removeProductFromCart(id: number) {
    this._cart.removeProduct(id);
  }

  logout() {
    this._auth.logout();
    this.isMenuOpen = false;
  }

  
  validarRolEmpresa() {

    if (this._token.getRole() == "ROLE_EMPRESA"){
      
      this.dropdownVisibleEmp = !this.dropdownVisibleEmp;
    }else{ this._router.navigate(['/register-empresa']);}
  }

}
