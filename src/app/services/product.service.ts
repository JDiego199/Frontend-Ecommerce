import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product, Cliente_empresa } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl+'api/';

  constructor(private http: HttpClient, private _api: ApiService) {}

  getAllProducts(limitOfResults = 9, page): Observable<Products> {
    return this.http.get<Products>(this.url + 'producto', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleProduct(id: Number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('api/producto/' + id);
  }

  getAllProductsEmpresa(id: Number):Observable<any>
  {
    return this.http.get(this.url+'productoEmpresa/'+id);
  }

  
  nuevoProducto(product: Product, id: any):Observable<any>
  {

    return  this._api.postTypeRequest('api/producto/'+id, product);

  }

}

