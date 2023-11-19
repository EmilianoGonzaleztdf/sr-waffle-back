import { Module } from '@nestjs/common';
import { HistorySaleService } from './history_sale.service';
import { HistorySaleController } from './history_sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorySale } from './entities/history_sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySale, Product, Order])],
  controllers: [HistorySaleController],
  providers: [HistorySaleService]
})
export class HistorySaleModule {}
