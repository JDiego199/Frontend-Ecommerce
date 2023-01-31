import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Orden, OrdenDetalles } from '../shared/models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId;

  orden: Orden ={
    id_orden: "",
    fecha: new Date(Date.now()),
    numero_factura: 3,
    subTotal: 4,
    total: 4,
    iva: 0.12,
  
  };

  lista: OrdenDetalles []=[];
  constructor(private _auth: AuthService, private _cart: CartService, private productService: ProductService) {
    this._auth.user.subscribe((user) => {
   
      if (user) {
        this.currentUser = user;
       console.log( this.currentUser);
        this.billingAddress[0].value = user.fname;
      //  this.billingAddress[1].value = user.email;
      }
    });

    this._cart.cartdatosO$.subscribe((ordes) => {
      this.lista = Object.values(ordes);
       console.log( this.lista)
      });
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });

  }

  ngOnInit(): void {}

  submitCheckout() {

    this.orden.subTotal=this.cartData.total;
    this.orden.total=this.cartData.total+ this.cartData.total*Number(this.orden.iva);
    this.loading = true;
    setTimeout(() => {
      this._cart
        .submitCheckout(this.orden)
        .subscribe(
          (res: any) => {
            this.orden = res;
            console.log(res);
            this.loading = false;
            this.orderId = res.id_orden;
        //    this.products = res.products;
        this.actulizarOrdenDetalles();
            this.currentStep = 4;
            this._cart.clearCart();
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
    }, 750);
  }
actulizarOrdenDetalles(){

  for(var i=0;i<this.lista.length;i++){
    this.productService.actualizarOrdenDel(this.orden,this.lista[i].id_orden_detalle).subscribe(
      res => {
        
         },
         err => console.log(err)
       );  
  }


}
  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(): void {


    this.nextStep();
  }

  canBillingSubmit(): boolean {
    return this.billingAddress.filter((field) => field.value.length > 0)
      .length !== 7
      ? true
      : false;
  }

  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }

  billingAddress = [
    {
      name: 'Nombre completo',
      placeholder: 'Ingrese su nombre completo',
      type: 'text',
      value: 'diego',
    },
    {
      name: 'Ciudad',
      placeholder: 'Ingrese la ciudad',
      type: 'text',
      value: '',
    },
    {
      name: 'Probincia',
      placeholder: 'Ingrese la provincia',
      type: 'text',
      value: '',
    },
    {
      name: 'Calle',
      placeholder: 'Ingrese la calle',
      type: 'text',
      value: '',
    },
    {
      name: 'Telefono',
      placeholder: 'Ingrese un numero de telefono',
      type: 'text',
      value: '',
    },
  ];
}
