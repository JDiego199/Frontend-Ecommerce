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

/*
const getBase64 = async (file: File): Promise<string> => {
  const image = await Jimp.read(file);
  return new Promise((resolve) => {
    image.getBase64(Jimp.MIME_JPEG, (err, src) => {
      resolve(src);
    });
  });
};
*/
@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss']
})



export class CreateProductoComponent {
  fileList: NzUploadFile[] = [

  ];
  previewImage: string | undefined = '';
  previewVisible = false;

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
    console.log(this.fileList);
  
    this.product.fileList[0]  = this.fileList[0].preview;
    this.productoServicio.nuevoProducto(this.product, this.userId).subscribe(
      res => {
        console.log(res);
  
        this.router.navigate(['/empresa-producto']);
  
      },
      err => console.log(err)
    );
  }




  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
     
      console.log(file.preview)
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

}
