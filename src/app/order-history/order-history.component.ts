import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Orden, OrdenDetalles } from '../shared/models/product.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  ordenes: Orden[]=[];
  usuarioId;
  ordenesDetalles: OrdenDetalles[]=[];
  userId;

  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService,
    private _token: TokenStorageService,
    private productService: ProductService
  ) {
   // this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this.usuarioId = this._token.getId();


    this.productService.ordenesCliente(this.usuarioId).subscribe(
      res=>{
        this.ordenes = res;
        console.log(this.ordenes);
      },
      err=>console.log(err)

    );

  


   /* this._api.getTypeRequest(`orders/?userId=${this.user.user_id}`).subscribe(
      (res: any) => {
        console.log(res);
        res.data.forEach((item) => {
          this._product
            .getSingleProduct(item.product_id)
            .subscribe((product) => {
              console.log(product);
              this.orders.push({ ...product, ...item });
            });
        });*/
        // let uniqueProductsArray = Array.from(
        //   new Set(res.data.map((p) => p.product_id))
        // );
      }

      odenesDetallesCompras(id:any){
        
        this.productService.ordenDetallesCliente(id).subscribe(
          res=>{
            this.ordenesDetalles = res;
            console.log(this.ordenes);
          },
          err=>console.log(err)
    
        );
    
      }

      isVisible = false;



      showModal(): void {
        this.isVisible = true;
      }
    
      handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
      }
    
      handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
      }
    
    
}
