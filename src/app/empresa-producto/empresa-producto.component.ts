import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Products, Product, ProductoEd } from '../shared/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-empresa-producto',
  templateUrl: './empresa-producto.component.html',
  styleUrls: ['./empresa-producto.component.scss']
})



export class EmpresaProductoComponent implements OnInit {
  confirmModal?: NzModalRef;
  public lista: Product [];
  listas: any =[];
  userId;
  isVisible = false;
  isConfirmLoading = false;



  public editCache: { [key: string]: { edit: boolean; dato: Product } } = {};
  listOfData: Product[] = [];
  
  searchValue = '';
  visible = false;

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

  productoEdi: ProductoEd = {

    nombre: '', 
    descripcion: '', 
    precio: Number(), 
    precio_fabrica: Number(), 
    cantidad: Number(), 
    descuento: Number(), 
    fecha_registro: new Date(Date.now()),
    fileList:[]
  };



  constructor(private productService: ProductService, private nzMessageService: NzMessageService,
    private _token: TokenStorageService,
    private modalService: NgbModal,
    private modal: NzModalService) {}


    confirm(): void {
      this.nzMessageService.info('Guardado');
    }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id_producto === id);
    this.editCache[id] = {
      dato: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {

    const index = this.listOfData.findIndex(item => item.id_producto === id);
    console.log( this.editCache[id].dato);
    this.productoEdi = {
 
      nombre: this.editCache[id].dato.nombre, 
      descripcion:  this.editCache[id].dato.descripcion, 
      precio: this.editCache[id].dato.precio, 
      precio_fabrica:  this.editCache[id].dato.precio_fabrica, 
      cantidad:  this.editCache[id].dato.cantidad, 
      descuento:  this.editCache[id].dato.descuento, 
      fileList: this.editCache[id].dato.fileList,
      fecha_registro: new Date(Date.now()),
    };

    console.log(this.productoEdi);
    this.confirm();
    this.productService.editarProducto(id, this.productoEdi).subscribe(
      res=>{
        console.log(id);
        //  this.handleOk();
      },

      err=>console.log(err)
    );
  

    Object.assign(this.listOfData[index], this.editCache[id].dato);
   

    this.editCache[id].edit = false;
  }

  updateEditCache(): void {

    this.listOfData.forEach(item => {
      this.editCache[item.id_producto] = {
        edit: false,
        dato: { ...item }
      };
    });
  }

  ngOnInit(): void {

    this.userId = this._token.getId();

    this.productService.getAllProductsEmpresa(this.userId).subscribe(
      res => {
     //   this.lista = res;
      //  this.product = res;
      this.listOfData = res;
       console.log(res);
       
    this.updateEditCache();
      },
      err => console.log(err)
    );


  }

    deleteRow(id: string): void {
      this.listOfData = this.listOfData.filter(d => d.id_producto !== id);

      console.log(id);
    }
  editarProducto(id, product: Product){
    this.productService.editarProducto(id, product).subscribe(
      res=>{
        console.log(id);
        //  this.handleOk();
      },

      err=>console.log(err)
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
        this.listOfData = res.filter((item: Product) => item.nombre.indexOf(this.searchValue) !== -1);
      },
      err => console.log(err)
    );
   
  }
  /*


  listarProductos() {

    this.productService.getAllProductsEmpresa(this.userId).subscribe(
      res => {
     //   this.lista = res;
      //  this.product = res;
      
       console.log(res);
      },
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

*/
}
