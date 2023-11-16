import { Controller, Get, Post,Param,} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  // devuelvo todas las ordenes
  @Get('/list')
  async findAll() : Promise<Order[]> {
    return this.orderService.findAll();
  }
  // devuelvo las ordenes con X detalles
  @Get('/findAllOrdersWithRelations')
  async findAllOrdersWithRelations() : Promise<Order[]> {
    return this.orderService.findAllOrdersWithRelations();
  }
  // devuelve todas las ordenes del dia
  @Get('/findAllOrdersForTodayWithRelations')
  async findAllOrdersForTodayWithRelations() : Promise<Order[]> {
    return this.orderService.findAllOrdersForTodayWithRelations();
  }
  // creo un nuevo pedido
  @Post('/create-order')
  async createOrder() {
    return await this.orderService.createOrder();
  }
  // busco ordenes por id
  @Get('/findByID/:id_order')
  async getOrder(@Param('id_order') id_order: number) {
    return await this.orderService.getOrderById(id_order);
  }
  // agrega un producto a un pedido (localhost:3001/order/addProductToOrder/7/1) 7 es el numero del pedido y 1 el numero del producto
  @Post('/addProductToOrder/:order/:product') 
  async addProductToOrder(@Param('order') id_order: number,@Param('product') id_product: number,): Promise<Order> {
    return await this.orderService.addProductToOrder(id_order, id_product);
  }
  // busca un producto por id
  @Get('/product/:id_product')
  async buscaproducto(@Param('id_product') id_product: number) : Promise<any> {
    return this.orderService.buscaProducto(id_product);
  }
  // devuelve el total de un pedido buscado por id
  @Get('/getTotalPriceOfOrder/:id_order')
  async getTotalPriceOfOrder(@Param('id_order') id_order: number): Promise<number> {// Parsea el ID a número
      const totalPrice = await this.orderService.getTotalPriceOfOrder(id_order);
      return totalPrice;
  }
  // devuelve la cantidad de productos de un pedido
  @Get('/productCount/:id_order/')
  async getProductCount(@Param('id_order') id_order: number): Promise<number> { // Parsea el ID a número
      const productCount = await this.orderService.getProductCountInOrder(id_order);
      return productCount;
  }
  @Get('today-with-product-totals')
  async getAllOrdersForTodayWithProductTotals(): Promise<any[]> {
    return await this.orderService.findAllOrdersForTodayWithProductTotals();
  }
}
