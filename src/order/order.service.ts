import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async getOrderByIdRelations(id_order: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id_order: id_order },
      relations: ['status', 'sale', 'products'],
    });
    if (!order) {
      throw new Error(`orden: ${id_order} not found`);
    }
    return order;
  }

  async getOrderByIdRelationProducts(id_order: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id_order: id_order },
      relations: ['products'],
    });
    if (!order) {
      throw new Error(`orden: ${id_order} not found`);
    }
    return order;
  }

  async getOrderById(id_order: number): Promise<Order> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'products')
      .where('order.id_order = :id', { id: id_order })
      .getOne();
  }

  private async getProductById(id_product: number): Promise<Product> {
    const criteriaProduct: FindOneOptions = {
      where: { id_product: id_product },
    };
    const product: Product = await this.productRepository.findOne(
      criteriaProduct,
    );
    if (!product) {
      throw new Error(`product: ${id_product} not found`);
    }
    return product;
  }

  private async getStatusById(id_status: string): Promise<Status> {
    const criteriaStatus: FindOneOptions = { where: { id_status: id_status } };
    const status: Status = await this.statusRepository.findOne(criteriaStatus);
    if (!status) {
      throw new Error(`status: ${id_status} not found`);
    }
    return status;
  }

  private async getDateTime(): Promise<string> {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/America/Argentina/Ushuaia',);
    const datetime: string = response.data.datetime;
    const datePartOnly: string = datetime.split('T')[0];
    return datePartOnly;
  }

  async createOrder(): Promise<Order> {
    const order = this.orderRepository.create();
    let status = await this.getStatusById('1');
    const date1 = await this.getDateTime();
    order.date = date1;
    order.status = status;
    order.products = [];
    return await this.orderRepository.save(order);
  }

  async addProductToOrder(
    id_order: number,
    id_product: number,
  ): Promise<Order> {
    const order = await this.getOrderById(id_order);
    const product = await this.getProductById(id_product);
    order.products.push(product);
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async changeOrderStatus(id_order: number, id_status: string): Promise<any> {
    const order = await this.getOrderById(id_order);
    const status = await this.getStatusById(id_status);
    order.status = status;
    await this.orderRepository.save(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findAllOrdersWithRelations(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['status', 'sale', 'products'],
    });
    return orders;
  }

  async findAllOrdersForTodayWithRelations(): Promise<Order[]> {
    const today = await this.getDateTime();
    const orders = await this.orderRepository.find({
      where: { date: today },
      relations: ['status', 'sale', 'products'],
    });
    return orders;
  }

  async getTotalPriceOfOrder(id_order: number): Promise<number> {
    const order = await this.getOrderById(id_order);
    let totalPrice = 0;
    if (order.products && order.products.length > 0) {
      totalPrice = order.products.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);
    }
    return totalPrice;
  }

  async getProductCountInOrder(orderId: number): Promise<number> {
    const order = await this.getOrderById(orderId);
    let productCount = 0;
    if (order.products && order.products.length > 0) {
      productCount = order.products.length;
    }
    return productCount;
  }

  async findAllOrdersForTodayWithProductTotals(): Promise<any[]> {
    const today = await this.getDateTime();
    const orders = await this.orderRepository.find({
      where: { date: today },
      relations: ['products', 'status'],
    });
    const ordersWithTotalsAndStatus = orders.map((order) => {
      let totalProducts = 0;
      let totalPrice = 0;
      let orderStatus = null;

      if (order.products && order.products.length > 0) {
        totalProducts = order.products.length;
        totalPrice = order.products.reduce((accumulator, product) => {
          return accumulator + product.price;
        }, 0);
      }
      if (order.status) {
        orderStatus = order.status;
      }
      return {
        id_order: order.id_order,
        total_products: totalProducts,
        total_price: totalPrice,
        status: orderStatus,
      };
    });
    return ordersWithTotalsAndStatus;
  }

  async getTotalProductsSoldForToday(): Promise<{
    totalProducts: number;
    totalPrice: number;
    totalOrders: number;
  }> {
    const today = await this.getDateTime();
    const orders = await this.orderRepository.find({
      where: {
        date: today,
      },
      relations: ['products'],
    });
    let totalProducts = 0;
    let totalPrice = 0;

    orders.forEach((order) => {
      if (order.products && order.products.length > 0) {
        totalProducts += order.products.length;
        totalPrice += order.products.reduce(
          (accumulator, product) => accumulator + product.price,
          0,
        );
      }
    });
    const totalOrders = orders.length;
    return { totalProducts, totalPrice, totalOrders };
  }
}
