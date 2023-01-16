export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
 // id_producto: Number;
  nombre: String;
  //category: String;
  descripcion: String;
  //image: String;
  precio: Number;
  precio_fabrica: Number;
  cantidad: Number;
  descuento: Number;
  fecha_registro: Date;
  cliente_empresa: Cliente_empresa;
  //images: String;
}

export interface Cliente_empresa {
  id_empresa: Number;
  dni_ruc: String;
  razon_social: String;
  nombre_comercial: String;
  reputacion: String;
  fecha_registro: Date;
 }
 
