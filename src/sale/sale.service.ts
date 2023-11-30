import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';


@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  private async getUserById(id_user: number): Promise<User> {
    const criteriaUser: FindOneOptions = {
      where: { id_user: id_user },
    };
    const user: User = await this.userRepository.findOne(
      criteriaUser,
    );
    if (!user) {
      throw new Error(`user: ${id_user} not found`);
    }
    return user;
  }
  private async getOrderById(id_order: number): Promise<Order> {
    const criteriaOrder: FindOneOptions = {
      where: { id_order: id_order },
    };
    const order: Order = await this.orderRepository.findOne(
      criteriaOrder,
    );
    if (!order) {
      throw new Error(`order: ${id_order} not found`);
    }
    return order;
  }
  async findAll(): Promise<CreateSaleDto[]> {
    return await this.saleRepository.find();
  }
  async getSaleByIdRelations(id_sale: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id_sale: id_sale },
      relations: ['order',], //consulta custom
    });
    if (!sale) {
      throw new Error (`sale: ${id_sale} not found`);
    }
    return sale;
  }
  async createSale(id_user: number, id_order: number): Promise<Sale> {
    const user = await this.getUserById(id_user);
    const order = await this.getOrderById(id_order);
      const newSale = new Sale();
      newSale.user = user;
      newSale.order = order;
      const savedSale = await this.saleRepository.save(newSale);
      return savedSale;
    }
  async updateOrderUserById (id_user: number, id_sale: number): Promise<any> {
    const user = await this.getUserById(id_user);
    const sale = await this.getSaleByIdRelations(id_sale);
    sale.user = user;
    await this.saleRepository.save(sale);
    return sale;
  }
}



