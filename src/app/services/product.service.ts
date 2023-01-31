import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product, Cliente_empresa, ProductoEd, OrdenDetalles, OrdenDetallesCrear, Orden } from '../shared/models/product.model';
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
  getAllProductsEmpresaLimit(limitOfResults = 9, page, id: Number):Observable<Products>
  {
    return this.http.get<Products>(this.url+'productoEmpresa/'+id,{
      params:{
        limit: limitOfResults.toString(),
        page: page,
      }
    })
  }


  getSingleProduct(id: Number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('api/producto/' + id);
  }

  getAllProductsEmpresa(id: Number):Observable<Product[]>
  {
    return this.http.get<Product[]>(this.url+'productoEmpresa/'+id);
  }

  
  nuevoProducto(product: Product, id: any):Observable<any>
  {

    return  this._api.postTypeRequest('api/producto/'+id, product);

  }

  eliminarProducto(id:any):Observable<any>
  {

    return  this._api.deleteTypeRequest('api/producto/'+id);

  }

  editarProducto(id:any, product: ProductoEd):Observable<any>
  {
    return this._api.putTypeRequest('api/producto/'+id, product);
  }

  /******************ORDENES DETALLES******************************** */
  carritoCliente(id: Number):Observable<OrdenDetalles[]>
  {
    return this.http.get<OrdenDetalles[]>(this.url+'orden_detallesCliente/'+id);
  }

  ingresarProductoCarrito(idCliente: Number,idProducto: any, ordes: OrdenDetallesCrear):Observable<any>
  {
    return this._api.postTypeRequest('api/orden_detalles/cliente='+idCliente+'/producto='+ idProducto, ordes)
  }

  eliminarProductoCarrito(id:any):Observable<any>
  {

    return  this._api.deleteTypeRequest('api/orden_detalles/'+id);

  }
  actualizarOrdenDel(orden:any, id:any): Observable<any> {
    return this._api.putTypeRequest('api/orden_detalles/'+id, orden);
  
  }

  ordenDetallesCliente(id: any):Observable<OrdenDetalles[]>
  {
    return this.http.get<OrdenDetalles[]>(this.url+'orden_detallesClienteCompras/'+id);
  }
  ordenDetallesEmpresa(id: any, id_empresa: any):Observable<OrdenDetalles[]>
  {
    return this.http.get<OrdenDetalles[]>(this.url+'orden_detallesEmpresaCompras/'+id+'/'+id_empresa);
  }
  

/********************************* */
crearOrden(orden: any, id:any): Observable<any> {
  return this._api.postTypeRequest('api/ordenes/'+id, orden);

}

ordesfull(id:any):Observable<Orden[]>
{
  return this.http.get<Orden[]>(this.url+'ordenes/'+id);
}

ordenesCliente(id:any):Observable<Orden[]>
{
  return this.http.get<Orden[]>(this.url+'ordenesCliente/'+id);
}


}

