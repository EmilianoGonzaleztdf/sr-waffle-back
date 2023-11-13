import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
import { OrderProduct } from 'src/order_product/entities/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Status, OrderProduct ])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
