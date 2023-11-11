import { Module } from '@nestjs/common';
import { HistorySaleService } from './history_sale.service';
import { HistorySaleController } from './history_sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorySale } from './entities/history_sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySale])],
  controllers: [HistorySaleController],
  providers: [HistorySaleService]
})
export class HistorySaleModule {}
