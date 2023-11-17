import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
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
  // metodos que voy a reutilizar - NO CAMBIAR SE ROMPE TODO

  // --buscador de ordenes--
  async getOrderByIdRelations(id_order: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id_order: id_order },
      relations: ['status', 'sale', 'products'], //consulta custom
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id_order} not found`);
    };
    return order;
  };
  // --buscador de ordenes--
  async getOrderById(id_order: number): Promise<Order> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'products')
      .where('order.id_order = :id', { id: id_order })
      .getOne();
  }
  // --buscador de producto--
  async getProductById(id_product: number): Promise<Product> {
    const criteriaProduct: FindOneOptions = {
      where: { id_product: id_product },
    };
    const product: Product = await this.productRepository.findOne(
      criteriaProduct,
    );
    if (!product) {
      throw new Error('No se pudo encontrar el producto');
    };
    return product;
  };
  // --buscador de status--
  async getStatusById(id_status: string): Promise<Status> {
    const criteriaStatus: FindOneOptions = { where: { id_status: id_status } };
    const status: Status = await this.statusRepository.findOne(criteriaStatus);
    if (!status) {
      throw new Error('No se pudo encontrar el status');
    };
    return status;
  };
  async getDateTime(): Promise<string> {
    const response = await axios.get(
      'http://worldtimeapi.org/api/timezone/America/Argentina/Ushuaia',
    );
    const datetime: string = response.data.datetime;
    // Extraer solo la parte de la fecha
    const datePartOnly: string = datetime.split('T')[0];
    return datePartOnly;
  };

  //---------------------------------------------------------------//
  // metodo que no voy a usar never
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  };
  //---------------------------------------------------------------//
  // metodos customs
  async findAllOrdersWithRelations(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['status', 'sale', 'products'],
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
        //date: Between(today, tomorrow),
      },
      relations: ['status', 'sale', 'products'],
    });
    return orders;
  };

  async createOrder(): Promise<Order> {
    const order = this.orderRepository.create();
    let status = await this.getStatusById('1');
    if (!status) {
      throw new Error('no se pudo encontrar el estado');
    }
      const date1 = await this.getDateTime(); // Esperar el resultado de getDateTime()
      order.date = date1;
      order.status = status;
      order.products = [];
      return await this.orderRepository.save(order);
  }

  async addProductToOrder(id_order: number,id_product: number,): Promise<Order> {
    // Busco la orden a la que deseo cargar productos
    const order = await this.getOrderById(id_order);
    if (!order) {
      throw new Error('No se encontró la orden');
    }
    // Verifico si el producto que quiero agregar existe
    const product = await this.getProductById(id_product);
    if (!product) {
      throw new Error('No se pudo encontrar el producto');
    } else {
          // Agregar el producto al arreglo de productos de la orde
      order.products.push(product);// guardo el producto
    }
    // Guardar la orden actualizada
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }
  
  
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
  }

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
       // date: Between(today, tomorrow),
      },
      relations: ['products', 'status'],
    });
    // Obtengo el total de productos, el precio total y el estado para cada orden
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
        orderStatus = order.status; // Asumiendo que 'status' es un campo directo en la entidad Order
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
  async changeOrderStatus(id_order: number, id_status: string): Promise<any> {
    //verifico si la orden existe
    const order = await this.getOrderById(id_order);
    if (!order) {
      throw new NotFoundException('No se encontro la orden');
    }
    const status = await this.getStatusById(id_status);
    if (!status) {
      throw new Error('No se pudo encontrar el status');
    }
    // modifico el status de la orden
    order.status = status;
    await this.orderRepository.save(order);

    return order;
  }
};
