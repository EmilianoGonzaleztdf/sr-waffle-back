import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { StatusModule } from './status/status.module';
import { SaleModule } from './sale/sale.module';
import { HistorySaleModule } from './history_sale/history_sale.module';


@Module({
  imports: [    TypeOrmModule.forRoot({
   /*
   // config local
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'emiliano1',
    database: 'tp_anual',
    */
   // config db online
    type: 'mysql',
    host: 'b1ycqaa9ezvmxmk0b3yt-mysql.services.clever-cloud.com',
    port: 3306,
    username: 'uunm7jwef64aq6my',
    password: '4kQdqDhA8YmuDIG4DsVk',
    database: 'b1ycqaa9ezvmxmk0b3yt',
    
    entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
    synchronize: true, //modo desarrollador.
  }), CategoryModule, ProductModule, RoleModule, PersonModule, UserModule, OrderModule, StatusModule, SaleModule, HistorySaleModule,],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
