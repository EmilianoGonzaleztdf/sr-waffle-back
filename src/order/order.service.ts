import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';

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

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  };
  
  async findAllOrdersWithRelations(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['status', 'sale', 'products',],
    });
    return orders;
  };

  async findAllOrdersForTodayWithRelations(): Promise<Order[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const orders = await this.orderRepository.find({
      where: {
        date: Between(today, tomorrow),
      },
      relations: ['status', 'sale', 'products'],
    });
    return orders;
  };

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
      relations: ['status','sale','products',], // Añade aquí las relaciones que necesitas cargar
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id_order} not found`);
    }
    return order;
  };

  async addProductToOrder(id_order: number, id_product: number): Promise<Order> {
    // Busco la orden a la que deseo cargar productos
    let order = await this.getOrderById(id_order);
    if (!order) {
      throw new Error('No se encontró la orden');
    } 
    // Verifico si el producto que quiero agregar existe
    const criteriaProduct: FindOneOptions = { where: { id_product: id_product } };
    const product: Product = await this.productRepository.findOne(criteriaProduct); 
    if (!product) {
      throw new Error('No se pudo encontrar el producto');
    // Agregar el producto al arreglo de productos de la orde
    } else {
      order.products.push(product);// guardo el producto
    }
    // Guardar la orden actualizada
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  };
  
  async buscaProducto (id_product : number): Promise<any>{
  const criteriaProduct: FindOneOptions = { where: { id_product: id_product } };
  const product: Product = await this.productRepository.findOne(criteriaProduct);
  if (!product) {
    throw new Error('No se pudo encontrar el producto');
      }
      console.log(product)
      return product;
  };
  
  async getTotalPriceOfOrder(id_order: number): Promise<number> {
    //verifico si la orden existe
    const order = await this.getOrderById(id_order);
    if (!order) {
      throw new NotFoundException('No se encontro la orden');
    }
    let totalPrice = 0;
    // Suma los precios de los productos en la orden
    if (order.products && order.products.length > 0) {
      totalPrice = order.products.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);
    }
    return totalPrice;
  };

  async getProductCountInOrder(orderId: number): Promise<number> {
    const order = await this.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('No se encontro la orden');
    }
    let productCount = 0;
    // Contar la cantidad de productos en la orden
    if (order.products && order.products.length > 0) {
      productCount = order.products.length;
    }
  
    return productCount;
  }
  async findAllOrdersForTodayWithProductTotals(): Promise<any[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const orders = await this.orderRepository.find({
      where: {
        date: Between(today, tomorrow),
      },
      relations: ['products'],
    });
    // Obtengo el total de productos y el precio total para cada orden
    const ordersWithTotals = orders.map(order => {
      let totalProducts = 0;
      let totalPrice = 0;
      if (order.products && order.products.length > 0) {
        totalProducts = order.products.length;
        totalPrice = order.products.reduce((accumulator, product) => {
          return accumulator + product.price;
        }, 0);
      }
      return { id_order: order.id_order, total_products: totalProducts, total_price: totalPrice };
    });
  
    return ordersWithTotals;
  }
};
