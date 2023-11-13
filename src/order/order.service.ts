import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { inspect } from 'util';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
  
  async findAllOrdersWithRelations(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['status', 'sale', 'products', 'quantities'],
    });
    return orders;
  }
  async findAllOrdersForTodayWithRelations(): Promise<Order[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const orders = await this.orderRepository.find({
      where: {
        date: Between(today, tomorrow),
      },
      relations: ['status', 'sale', 'products', 'quantities'],
    });
    return orders;
  }

  async createOrder(): Promise<Order> {
    const order = this.orderRepository.create();
    const criteria: FindOneOptions = { where: { id_status: 1 } };
    let status: Status = await this.statusRepository.findOne(criteria);
    if (!status) {
      throw new Error('no se pudo encontrar el estado');
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }
  async getOrderById(id_order: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id_order : id_order },
      relations: ['status','sale','products','quantities'], // Añade aquí las relaciones que necesitas cargar
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id_order} not found`);
    }
    return order;
  }

  async addProductToOrder(orderId: number, id_product: number): Promise<Order> {
    // Busco la orden a la que deseo cargar productos
    const order = await this.getOrderById(orderId);
    if (!order) {
      throw new Error('No se encontró la orden');
    }
    // Verifico si el producto que quiero agregar existe
    const criteriaProduct: FindOneOptions = { where: { id_product: id_product } };
    const product: Product = await this.productRepository.findOne(criteriaProduct);
  
    if (!product) {
      throw new Error('No se pudo encontrar el producto');
    }
    // Creo una nueva instancia de OrderProduct y asigno los valores
    const orderProduct = new OrderProduct();
    orderProduct.fk_id_order = order.id_order;
    orderProduct.fk_id_product = product.id_product;  // Asegúrate de que esta asignación sea correcta
    orderProduct.quantity = 1;  // Puedes ajustar esto según sea necesario
    // Guardo el nuevo OrderProduct en la base de datos
    await this.orderProductRepository.save(orderProduct);
    // Retorna la orden actualizada
    return order;
  }
  
  async buscaProducto (id_product : number): Promise<any>{
  const criteriaProduct: FindOneOptions = { where: { id_product: id_product } };
  const product: Product = await this.productRepository.findOne(criteriaProduct);
  if (!product) {
    throw new Error('No se pudo encontrar el producto');
      }
      console.log(product)
      return product;
  }


  // Implement other methods like removeProductFromOrder, updateProductQuantity, etc.
}
