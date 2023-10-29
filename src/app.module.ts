import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/*
import { ProductsController } from './old/products-copy/products.controller';
import { ProductsService } from './old/products-copy/products.service';
import { UsersController } from './old/users-copy/users.controller';
import { UsersService } from './old/users-copy/users.service';
import { SalesController } from './old/sales-copy/sales.controller';
import { SalesService } from './old/sales-copy/sales.service';
import { StockController } from './old/stock-copy/stock.controller';
import { StockService } from './old/stock-copy/stock.service';
import { CartController } from './old/cart-copy/cart.controller';
import { CartService } from './old/cart-copy/cart.service';
*/
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'emiliano1',
    database: 'tp_anual',
    entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
    synchronize: true, //modo desarrollador.
  }),],
  controllers: [AppController, /*ProductsController, UsersController, SalesController, StockController, CartController*/],
  providers: [AppService, /*ProductsService, UsersService, SalesService, StockService, CartService*/],
})
export class AppModule {}
