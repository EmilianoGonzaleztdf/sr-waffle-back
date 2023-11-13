import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Get('/list')
  async findAll() : Promise<Order[]> {
    return this.orderService.findAll();
  }
  @Get('/findAllOrdersWithRelations')
  async findAllOrdersWithRelations() : Promise<Order[]> {
    return this.orderService.findAllOrdersWithRelations();
  }
  @Get('/findAllOrdersForTodayWithRelations')
  async findAllOrdersForTodayWithRelations() : Promise<Order[]> {
    return this.orderService.findAllOrdersForTodayWithRelations();
  }
  @Post('/create-order')
  async createOrder() {
    return await this.orderService.createOrder();
  }
  
  @Get('/findByID/:id_order')
  async getOrder(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderById(id_order);
  }
  
  @Post('/addProductToOrder/:order/:product') 
  async addProductToOrder(@Param('order') id_order: number,@Param('product') id_product: number,): Promise<Order> {
    return await this.orderService.addProductToOrder(id_order, id_product);
  }
  @Get('/product/:id_product')
  async buscaproducto(@Param('id_product') id_product: number) : Promise<any> {
    return this.orderService.buscaProducto(id_product);
  }
  // Implement other endpoints for managing the order
}
  // Implement other endpoints for managing the order
