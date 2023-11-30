import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list')
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post('/create-order')
  async createOrder() {
    return await this.orderService.createOrder();
  }

  @Get('/getOrderByIdRelations/:id_order')
  async getOrderByIdRelations(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderByIdRelations(id_order);
  }

  @Get('/getOrderByIdRelationsProducts/:id_order')
  async getOrderByIdRelationProducts(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderByIdRelationProducts(id_order);
  }

  @Get('/findByID/:id_order')
  async getOrderById(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderById(id_order);
  }

  @Post('/addProductToOrder/:order/:product')
  async addProductToOrder(
    @Param('order') id_order: number,
    @Param('product') id_product: number,
  ): Promise<Order> {
    return await this.orderService.addProductToOrder(id_order, id_product);
  }

  @Patch('updateStatus/:id_order/:id_status')
  async changeOrderStatus(
    @Param('id_order') id_order: number,
    @Param('id_status') id_status: string,
  ): Promise<any> {
    return await this.orderService.changeOrderStatus(id_order, id_status);
  }

  @Get('/findAllOrdersWithRelations')
  async findAllOrdersWithRelations(): Promise<Order[]> {
    return this.orderService.findAllOrdersWithRelations();
  }

  @Get('/findAllOrdersForTodayWithRelations')
  async findAllOrdersForTodayWithRelations(): Promise<Order[]> {
    return this.orderService.findAllOrdersForTodayWithRelations();
  }

  @Get('/getTotalPriceOfOrder/:id_order')
  async getTotalPriceOfOrder(
    @Param('id_order') id_order: number,
  ): Promise<number> {
    const totalPrice = await this.orderService.getTotalPriceOfOrder(id_order);
    return totalPrice;
  }

  @Get('/productCount/:id_order/')
  async getProductCount(@Param('id_order') id_order: number): Promise<number> {
    const productCount = await this.orderService.getProductCountInOrder(
      id_order,
    );
    return productCount;
  }

  @Get('/findAllOrdersForTodayWithProductTotals')
  async getAllOrdersForTodayWithProductTotals(): Promise<any[]> {
    return await this.orderService.findAllOrdersForTodayWithProductTotals();
  }
  
  @Get('/getTotalProductsSoldForToday')
  async getTotalsForToday(): Promise<{ totalProducts: number; totalPrice: number }> {
    return this.orderService.getTotalProductsSoldForToday();
  }
}
