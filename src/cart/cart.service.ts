import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  order = [];
  orderToBox = [];
  public getCartOrder(): any {
    return this.order;
  }

  public addCartOrder(body): string {

    let existe = false;
    let posicion;

    for (let i = 0; i < this.order.length; i++) {
      if (this.order[i].id == body.id) {
        console.log("es igual");
        existe = true;
        posicion = i;
      };
    }
    
      if ( existe === true){
        this.order[posicion].quantity += 1; 
        console.log(this.order[posicion]);
        console.log(this.order);

      }else{

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
  }



  public deleteCartOrder(): any {
    return this.order.splice(0, this.order.length);
  }
  public viewOrder(): any {
    let length = 0;
    length = this.order.length;
    return length;
  }
  public calculateTotal(): number {
    const total = this.order.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);
    return total;
  }
}
