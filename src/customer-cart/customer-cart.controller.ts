import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomerCartService } from './customer-cart.service';

@Controller('/customerCart')
export class CustomerCartController {
  private cartOrder = [];
  constructor(private customerCartService: CustomerCartService){}

  @Get('/orderList')
  public getOrderList():any{
    return this.customerCartService.getOrderList();
  }
  @Post('/addOrder')
  public addOrder(@Body() body:any):any{
    return this.customerCartService.addOrder(body);
  }
  @Delete('/deleteOrder')
  public deleteOrder():any{
    return this.customerCartService.deleteOrder();
  }
  @Get('/finishOrder')
  public finishOrder():any{
    this.customerCartService.finishOrder();
  }
  @Get('viewOrder')
  public viewOrder():any{
    return this.customerCartService.viewOrder();
  }
}
