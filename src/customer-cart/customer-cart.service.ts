import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CustomerCart } from './customer-cart';

@Injectable()
export class CustomerCartService {
  private order = [];

  constructor() {
    this.loadOrder();
  }

  private loadOrder(): void {
    let archive = fs.readFileSync('cart.txt', 'utf-8');
    let data = archive
      .split('\n')
      .map((p) => p.replace('\r', ''))
      .map((p) => p.split(','));

    let data1 = [];

    for (let i = 0; i < data.length; i++) {
      let id = parseInt(data[i][0]);
      let price = parseInt(data[i][3]);
      let quantity = parseInt(data[i][4]);
      let order = new CustomerCart(id, data[i][1], data[i][2],data[i][3],price, quantity);
      data1.push(order);
    }
  }
  public getOrderList(): any {
    this.loadOrder;
    return this.order;
  }
  public addOrder(body: any): string {
    let id = parseInt(body.id);
    let price = parseInt(body.price);
    let quantity = parseInt(body.quantity);

    let order = new CustomerCart(id,body.name,body.description,body.imgUrl,price,quantity);
    {
      fs.appendFileSync('cart.txt',`\n${order.getId()},${order.getName()},${order.getDescription()},${order.getImgUrl()},${order.getPrice()},${order.getQuantity()}`,);
      this.order.push(order);
      return 'OK';
    }
  }
  public async deleteOrder() {
    let filePath = 'cart.txt';
    try {
      await fs.promises.writeFile(filePath, '');
      console.log('Archivo vaciado correctamente.');
    } catch (error) {
      console.error('Error al vaciar el archivo:', error);
    }
  }
  public finishOrder(): any {
    console.log('order finished. thank you')
    console.log(this.order)
    this.deleteOrder();
  }
}
