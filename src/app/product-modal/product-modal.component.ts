import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Products, Product } from '../shared/models/product.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  product: Product ;
  modalRef: NgbModalRef;
  
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

 /* saveProduct() {
    this.productService.saveProduct(this.product).subscribe(() => {
      this.modalRef.close();
    });
  }*/
}
