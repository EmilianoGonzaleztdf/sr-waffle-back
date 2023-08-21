import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales/sales.service';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController, SalesController, StockController, CartController],
  providers: [AppService, ProductsService, UsersService, SalesService, StockService, CartService],
})
export class AppModule {}
