import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Orden, OrdenDetalles } from '../shared/models/product.model';

@Component({
  selector: 'app-ordenes-empresa',
  templateUrl: './ordenes-empresa.component.html',
  styleUrls: ['./ordenes-empresa.component.scss']
})
export class OrdenesEmpresaComponent {

ordenes: Orden[]=[];
userId;
ordenesDetalles: OrdenDetalles[]=[];
constructor(private productService: ProductService, private _token: TokenStorageService){

}

  ngOnInit(): void {
    this.userId = this._token.getId();
    this.productService.ordesfull(this.userId).subscribe(
      res=>{
        this.ordenes = res;
        console.log(this.ordenes);
      },
      err=>console.log(err)

    );

  }

  odenesDetallesCompras(id:any){
        
    this.productService.ordenDetallesEmpresa(id,  this.userId ).subscribe(
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
