import { Component } from '@angular/core';
import { Products, Product } from '../shared/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Observer } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});


@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss']
})



export class CreateProductoComponent {


  product: Product = {
    id_producto: '',
    nombre: '',
    descripcion: '',
    precio: Number(),
    precio_fabrica: Number(),
    cantidad: Number(),
    descuento: Number(),
    fecha_registro: new Date(Date.now()),
    fileList: []
  };


  //product: Product;
  userId;
  constructor(
    private productoServicio: ProductService,
    private router: Router,
    private _auth: AuthService,
    private _token: TokenStorageService,
    private msg: NzMessageService
  ) { }


  ngOnInit(): void {

    let id = this._token.getId();
    this.userId = id;
    console.log(this.userId);

  }


  nuevoProduct() {

    this._auth

    this.productoServicio.nuevoProducto(this.product, this.userId).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/empresa-producto']);
      },
      err => console.log(err)
    );
  }


  fileList: NzUploadFile[] = [

  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

}
