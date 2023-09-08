import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor (private cartController: CartService){}

  @Get('/order')
  public getCartOrder():any{
    return this.cartController.getCartOrder();
  }
  @Post('/addOrder')
  public addCartOrder(@Body() body:any): any{
    return this.cartController.addCartOrder(body);
  }
  @Delete('/deleteOrder')
  public deleteCartOrder(): any{
    return this.cartController.deleteCartOrder();
  }
  @Get('viewOrder')
  public viewOrder():any{
    return this.cartController.viewOrder();
  }
  @Get('total')
  getTotal(): number {
    return this.cartController.calculateTotal();
  }

  @Get('ordenTotal')
  getOrdenTotal(): number {
    return this.cartController.calcular();
  }
}
