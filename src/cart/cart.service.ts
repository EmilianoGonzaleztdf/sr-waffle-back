import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  order = [];
  orderToBox = [];
public getCartOrder(): any{
  return this.order
}
public addCartOrder(body): string {
  this.order.push(body);
  return `The following article was added to the order:
  id : ${body.id}
  name : ${body.name}
  description : ${body.description}
  imgUrl : ${body.imgUrl}
  price : ${body.price}
  quantity : ${body.quantity}
  `;
}
public deleteCartOrder(): any {
  return this.order.splice(0,this.order.length)
}
public viewOrder():any{
  let length = 0;
  length = this.order.length
  return length
}
}
