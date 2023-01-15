export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  id_producto: Number;
  nombre: String;
  //category: String;
  descripcion: String;
  //image: String;
  precio: Number;
  cantidad: Number;
  //images: String;
}
