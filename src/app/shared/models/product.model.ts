

export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  id_producto: string;
  nombre: string;
  //category: String;
  descripcion: string;
  //image: String;
  precio: Number;
  precio_fabrica: Number;
  cantidad: Number;
  descuento: Number;
  fecha_registro: Date;
  fileList: string[];
  //cliente_empresa: Cliente_empresa;
  //images: String;
}
export interface ProductoEd {

  nombre: string;
  //category: String;
  descripcion: string;
  //image: String;
  precio: Number;
  precio_fabrica: Number;
  cantidad: Number;
  descuento: Number;
  fecha_registro: Date;
  fileList: string[];
  //cliente_empresa: Cliente_empresa;
  //images: String;
}

export interface Cliente_empresa {
  id_empresa: Number;
  dni_ruc: String;
  razon_social: String;
  nombre_comercial: String;
  reputacion: String;
  fecha_registro: Date;
  cliente: Cliente;
 }

 export interface Cliente {

  id_cliente: Number;
  nombre: String;
  email: String;
  telefono: String;
  fecha_nacimiento: Date;
  fecha_registro: Date;
  password: String;
  userName: String;
  roles:  Roles[];

}

export interface  Roles {
  id: Number;
  rolNombre: String;
}
 

