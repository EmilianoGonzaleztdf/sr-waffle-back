import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  //- productos en memoria -//
  products  = [
    {id:0, name : 'Waffle Sergio' , description : "1 bocha de helado sabor Crema americana , 1 bocha de helado sabor vainilla, topping de chispitas de chocolate, salsa de frutilla", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:1, name : 'Waffle Emiliano' , description : "2 bochas de helado sabor DDL granizado, toppins de frutilla, salsa de DDL", imgUrl : 'https://i.ibb.co/TbYgZx3/w2.jpg' , price : 3000},
    {id:2, name : 'Waffle Maria' , description : "1 bocha de helado sabor Crema Americana, 1 bocha de helado sabor Chocolate, toppins de almendra, salsa dulce de leche", imgUrl : 'https://i.ibb.co/tHSYb5G/w3.jpg' , price : 1500},
    {id:3, name : 'Waffle3' , description : "1 bochas de helado, toppins de sandia , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 150},
    {id:4, name : 'Waffle4' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:5, name : 'Waffle5' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:6, name : 'Waffle6' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:7, name : 'Waffle7' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:8, name : 'Waffle8' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
  ]

  public getProducts(): any {
    return this.products;
  }
  public postCreateProduct(body): string {
    this.products.push(body);
    return `The producto was created with the following attributes:
    id: ${body.id}
    name: ${body.name}
    description: ${body.description}
    imgUrl: ${body.imgUrl}
    price: ${body.price}
    `;
  }
  public getFindProductID(id: number): any {
    let product = this.products.find((p) => p.id === id);
    let productAux = [];
    productAux.push(product);
    return productAux;
  }
  public getFindProductName(name: string): any {
    let product = this.products.find((p) => p.name === name);
    let productAux = [];
    productAux.push(product);
    return productAux;
  }
  public getDeleteProductID(id: number): any {
    let productExists = false;
    let productPosition = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i].id) {
        productExists = true;
        productPosition = i;
      }
    }
    if (productExists) {
      this.products.splice(productPosition, 1);
      return {
        msj: `product ${id } was removed`,
        producto: this.products[productPosition],
      };
    } else {
      return { msj: ` cannot find requested product with ID: ${id}` };
    }
  }

  public updateProductByID(id: number, body: any): any {
    const productIndex = this.products.findIndex((p) => p.id === id);
  
    if (productIndex !== -1) {
      const productToUpdate = this.products[productIndex];
  
      if (body.name !== undefined) {
        productToUpdate.name = body.name;
      }
      if (body.description !== undefined) {
        productToUpdate.description = body.description;
      }
      if (body.imgUrl !== undefined) {
        productToUpdate.imgUrl = body.imgUrl;
      }
      if (body.price !== undefined) {
        productToUpdate.price = body.price;
      }
  
      return {
        msj: `Product ${id} updated successfully`,
        producto: productToUpdate,
      };
    } else {
      return { msj: `Product ID not found ${id}` };
    }
  }
  
}
