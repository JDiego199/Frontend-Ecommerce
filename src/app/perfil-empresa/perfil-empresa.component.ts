import { Component, OnInit } from '@angular/core';
import { Cliente, Cliente_empresa, Product, Roles } from '../shared/models/product.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, ResolveStart, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {

  id: string = "";
  products: Product[] = [];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  /*
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
      }*/
  cliente_empresa: Cliente_empresa = {

    id_empresa: Number(),
    dni_ruc: '',
    razon_social: '',
    nombre_comercial: '',
    reputacion: '',
    fecha_registro: new Date

  }

  userId;

  constructor(private _token: TokenStorageService, 
    private authservice: AuthService, 
    private router: Router, 
    private antivateRouter: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,) {



  }
  
  ngOnInit(): void {

    this.id = this.antivateRouter.snapshot.params['id_empresa'];
    this.loading = true;
    this.authservice.getClienteEmperesaById(this.id).subscribe(
      res => {
        this.cliente_empresa = res;

        console.log(res);

      },
      err => console.log(err)
    );
    setTimeout(() => {
      this.productService.getAllProductsEmpresaLimit(9, this.productPageCounter, parseInt(this.id)).subscribe(
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
      this.productService.getAllProductsEmpresaLimit(9, this.productPageCounter, parseInt(this.id)).subscribe(
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

  //////////////////////////**************************** */
  searchValue = '';
  listOfData: Product[] = [];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
   // this.visible = false;
   this.id = this.antivateRouter.snapshot.params['id_empresa'];

    this.productService.getAllProductsEmpresa(parseInt(this.id)).subscribe(
      res => {
      //  this.lista = res;        
        this.products = res.filter((item: Product) => item.nombre.indexOf(this.searchValue) !== -1);
      },
      err => console.log(err)
    );
   
  }



}