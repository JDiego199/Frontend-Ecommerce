import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Products, Product } from '../shared/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';



@Component({
  selector: 'app-empresa-producto',
  templateUrl: './empresa-producto.component.html',
  styleUrls: ['./empresa-producto.component.scss']
})



export class EmpresaProductoComponent implements OnInit {
  confirmModal?: NzModalRef;
  public lista: Product [];
  busqueda: Product[];
  userId;
  isVisible = false;
  isConfirmLoading = false;

  searchValue = '';
  visible = false;

  product: Product = {
    id_producto: '',
    nombre: '', 
    descripcion: '', 
    precio: Number(), 
    precio_fabrica: Number(), 
    cantidad: Number(), 
    descuento: Number(), 
    fecha_registro: new Date(Date.now()),
  };

  constructor(private productService: ProductService,
    private _token: TokenStorageService,
    private modalService: NgbModal,
    private modal: NzModalService) {}

  ngOnInit(): void {

    this.listarProductos();

    let id = this._token.getId();
    this.userId = id;

   // this.updateEditCache();
  }


  editarProducto(id, product: Product){
    this.productService.editarProducto(id, product).subscribe(
      res=>{
          this.handleOk();
      },

      err=>console.log(err)
    );
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    let id = this._token.getId();
    this.userId = id;

    this.productService.getAllProductsEmpresa(this.userId).subscribe(
      res => {
      //  this.lista = res;
        
        this.lista = res.filter((item: Product) => item.nombre.indexOf(this.searchValue) !== -1);
        console.log( res.filter((item: Product) => item.nombre.indexOf('dd') !== -1));
      },
      err => console.log(err)
    );
   
  }

  listarProductos() {
    //this.tareaService.getTareas().subscribe(
    let id = this._token.getId();
    this.userId = id;

    this.productService.getAllProductsEmpresa(this.userId).subscribe(
      res => {
        this.lista = res;
       console.log(res);
      },
      err => console.log(err)
    );

  }

  eliminarProducto(id: String) {

    this.productService.eliminarProducto(id).subscribe(
      res => { this.ngOnInit(); },
      err => console.log(err)
    );
  }



  showConfirm(id): void {

    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro de borrar el producto?',
      nzContent: 'Si borras el producto, este no volvera a parecer en tu inventario y no se podra recuperar',

      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.eliminarProducto(id),
            setTimeout(Math.random() > 0.5 ? resolve : reject, 500);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  showModal(): void {
    this.isVisible = true;
  }


  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {

      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
