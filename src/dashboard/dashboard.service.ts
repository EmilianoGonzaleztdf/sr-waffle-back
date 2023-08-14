import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  //----------------------- users,stock, products from memory {HARCODEADO}--------------------//

  //-- roles? administrador , cajero , cocina -- // 
users = [
  {id:0, name : 'Javier' , password : "1234", rol : "admin"},
  {id:1, name : 'Sergio' , password : "1234", rol : "cajero"},
  {id:2, name : 'Laura' , password : "1234", rol : "cajero"},
  {id:3, name : 'Emiliano' , password : "1234", rol : "cocina"},
  {id:4, name : 'Fernando' , password : "1234", rol : "cocina"}
]
stock = [
  {id:0, name : 'harina x kg' , brand : 'molino Sergio', quantity : 10},
  {id:1, name : 'huevo x unidad'  , brand : 'sabradios', quantity : 120},
  {id:2, name : 'azucar x 1kg'  , brand : '', quantity : 10},
  {id:3, name : 'helado crema americana x KG'  , brand : 'grido', quantity : 10},
  {id:4, name : 'salsa frutilla 500cc'  , brand : 'marolio', quantity : 5},
  {id:5, name : 'aceite de girasol 5L'  , brand : 'cocinero', quantity : 5}
];
products = [
  {id:0, name : 'harina x kg' , brand : 'molino Sergio', quantity : 10},
  {id:1, name : 'huevo x unidad'  , brand : 'sabradios', quantity : 120},
  {id:2, name : 'azucar x 1kg'  , brand : '', quantity : 10},
  {id:3, name : 'helado crema americana x KG'  , brand : 'grido', quantity : 10},
  {id:4, name : 'salsa frutilla 500cc'  , brand : 'marolio', quantity : 5},
  {id:5, name : 'aceite de girasol 5L'  , brand : 'cocinero', quantity : 5}
];

public getUsers(): any {
  return this.users
}
public getStock(): any {
  return this.stock
}
public getProducts(): any {
  return this.products
}
}
