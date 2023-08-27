import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockController: StockService) {}

  @Get('/list')
  public getStock(): any {
    return this.stockController.getStock();
  }
  @Get('search/:keyword')
  searchUsers(@Param('keyword') keyword: string): any[] {
    if (keyword === "") { // Usa === para comparar
      return this.stockController.getStock();
    }
    return this.stockController.searchStockByKeyword(keyword);
  }
  @Post('/addItem')
  public postCreateStockItem(@Body() body): string {
    return this.stockController.postCreateStockItem(body);
  }
  @Get('/delete/:id')
  public getDeleteStockItemByID(@Param('id', ParseIntPipe) id: number): any {
    return this.stockController.getDeleteStockItemByID(id);
  }
}