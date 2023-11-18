import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  //=============== endpoints basicos
  // devuelvo todas las ordenes
  @Get('/list')
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
  // creo un nuevo pedido
  @Post('/create-order')
  async createOrder() {
    return await this.orderService.createOrder();
  }
  // busco ordenes por id
  @Get('/getOrderByIdRelations/:id_order')
  async getOrderByIdRelations(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderByIdRelations(id_order);
  }
  @Get('/findByID/:id_order')
  async getOrderById(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderById(id_order);
  }
  // agrega un producto a un pedido (localhost:3001/order/addProductToOrder/7/1) 7 es el numero del pedido y 1 el numero del producto
  @Post('/addProductToOrder/:order/:product')
  async addProductToOrder(
    @Param('order') id_order: number,
    @Param('product') id_product: number,
  ): Promise<Order> {
    return await this.orderService.addProductToOrder(id_order, id_product);
  }
  // cambia el estado de la orden (sin pagar/ pagado etc)
  @Patch('updateStatus/:id_order/:id_status')
  async changeOrderStatus(
    @Param('id_order') id_order: number,
    @Param('id_status') id_status: string,
  ): Promise<any> {
    return await this.orderService.changeOrderStatus(id_order, id_status);
  }
  //=============== endpoints de estadisticas o datos para el front
  // devuelvo las ordenes con X detalles
  @Get('/findAllOrdersWithRelations')
  async findAllOrdersWithRelations(): Promise<Order[]> {
    return this.orderService.findAllOrdersWithRelations();
  }
  // devuelve todas las ordenes del dia
  @Get('/findAllOrdersForTodayWithRelations')
  async findAllOrdersForTodayWithRelations(): Promise<Order[]> {
    return this.orderService.findAllOrdersForTodayWithRelations();
  }
  // devuelve el total de un pedido buscado por id
  @Get('/getTotalPriceOfOrder/:id_order')
  async getTotalPriceOfOrder(
    @Param('id_order') id_order: number,
  ): Promise<number> {
    // Parsea el ID a número
    const totalPrice = await this.orderService.getTotalPriceOfOrder(id_order);
    return totalPrice;
  }
  // devuelve la cantidad de productos de un pedido
  @Get('/productCount/:id_order/')
  async getProductCount(@Param('id_order') id_order: number): Promise<number> {
    // Parsea el ID a número
    const productCount = await this.orderService.getProductCountInOrder(
      id_order,
    );
    return productCount;
  }
  // devuelve el total de ventas del dia
  @Get('/findAllOrdersForTodayWithProductTotals')
  async getAllOrdersForTodayWithProductTotals(): Promise<any[]> {
    return await this.orderService.findAllOrdersForTodayWithProductTotals();
  }
}
