import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Products, Product } from '../shared/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';


@Component({
  selector: 'app-empresa-producto',
  templateUrl: './empresa-producto.component.html',
  styleUrls: ['./empresa-producto.component.scss']
})
export class EmpresaProductoComponent implements OnInit {

  lista:any=[];
  userId ;
  
  constructor(private productService: ProductService, private _token: TokenStorageService,private modalService: NgbModal ) { }

  ngOnInit(): void {

    this.listarProductos();

  }
  listarProductos()
  {
    //this.tareaService.getTareas().subscribe(
      let id = this._token.getId();
      this.userId = id;

    this.productService.getAllProductsEmpresa(this.userId).subscribe(
      res=>{
        this.lista=res;
        console.log(res);
      },
      err=>console.log(err)
    );

  }

}
