import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WafflesController } from './dataForFront/waffles.controller';
import { WafflesService } from './dataForFront/waffles.service';
import { CustomerCartController } from './customer-cart/customer-cart.controller';
import { CustomerCartService } from './customer-cart/customer-cart.service';


@Module({
  imports: [],
  controllers: [AppController, WafflesController, CustomerCartController],
  providers: [AppService, WafflesService, CustomerCartService],
})
export class AppModule {}
