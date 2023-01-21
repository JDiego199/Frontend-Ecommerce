import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';
import { formatDistance } from 'date-fns';
// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper/core';
import { CartService } from '../services/cart.service';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id_producto: number;
  product: any;
  quantity: number;
  showcaseImages: any[] = [];
  loading = false;


  ///////////////////////////////////////
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
///////////////////////////////////
  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        // returns string so convert it to number
        this.id_producto = parseInt(productId);
        this._product.getSingleProduct(productId).subscribe((product) => {
          console.log(product);
          this.product = product;
          if (product.quantity === 0) this.quantity = 0;
          else this.quantity = 1;

          if (product.fileList) {
            this.showcaseImages = product.fileList;
          }
          this.loading = false;
        });
      });
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.id_producto,
      price: this.product.precio,
      quantity: this.quantity,
      image: this.product.fileList,
      title: this.product.nombre,
      maxQuantity: this.product.quantity,
    });
  }




  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);

  }
}
