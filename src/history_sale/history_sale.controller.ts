import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorySaleService } from './history_sale.service';
import { HistorySale } from './entities/history_sale.entity';

@Controller('history-sale')
export class HistorySaleController {
  constructor(private readonly historySaleService: HistorySaleService) {}

}
