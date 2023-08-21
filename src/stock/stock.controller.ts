import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockController: StockService) {}

  @Get('/list')
  public getStock(): any {
    return this.stockController.getStock();
  }

  @Post('/addItem')
  public postCreateStockItem(@Body() body): string {
    return this.stockController.postCreateStockItem(body);
  }

  @Get('/find/:id')
  public getFindStockItemByID(@Param('id', ParseIntPipe) id: number): any {
    return this.stockController.getFindStockItemByID(id);
  }

  @Get('/findName/:name')
  public getFindStockItemByName(@Param('name') name: string): any {
    return this.stockController.getFindStockItemByName(name);
  }

  @Get('/delete/:id')
  public getDeleteStockItemByID(@Param('id', ParseIntPipe) id: number): any {
    return this.stockController.getDeleteStockItemByID(id);
  }
}