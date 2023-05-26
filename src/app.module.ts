import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WafflesController } from './waffles/waffles.controller';
import { WafflesService } from './waffles/waffles.service';

@Module({
  imports: [],
  controllers: [AppController, WafflesController],
  providers: [AppService, WafflesService],
})
export class AppModule {}
