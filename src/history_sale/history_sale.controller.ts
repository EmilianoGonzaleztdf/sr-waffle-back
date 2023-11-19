import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorySaleService } from './history_sale.service';
import { CreateHistorySaleDto } from './dto/create-history_sale.dto';
import { UpdateHistorySaleDto } from './dto/update-history_sale.dto';

@Controller('history-sale')
export class HistorySaleController {
  constructor(private readonly historySaleService: HistorySaleService) {}

  @Post()
  create(@Body() createHistorySaleDto: CreateHistorySaleDto) {
    return this.historySaleService.create(createHistorySaleDto);
  }

  @Get()
  findAll() {
    return this.historySaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historySaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorySaleDto: UpdateHistorySaleDto) {
    return this.historySaleService.update(+id, updateHistorySaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historySaleService.remove(+id);
  }
}
