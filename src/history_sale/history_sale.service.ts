import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorySale } from './entities/history_sale.entity';
import { FindOneOptions, Repository } from 'typeorm';
import axios from 'axios';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class HistorySaleService {
  constructor(
    @InjectRepository(HistorySale)
    private readonly historySaleRepository: Repository<HistorySale>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}


}
