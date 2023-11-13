import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get('/list')
  async findAll() : Promise<CreateSaleDto[]> {
    return this.saleService.findAll();
  }
  /*
  @Get('search/:keyword')
  async searchSaleByKeyword(@Param('keyword') keyword : string) : Promise<CreateSaleDto[]>{
    if(keyword === ''){
      return this.saleService.findAll();
    }
    return this.saleService.searchSaleByKeyword(keyword);
  } ;

  
  @Patch('/update/:id/:category')
  async update (@Body() sale:sale, @Param('id') id : number,@Param('category') category : number) : Promise<String>{
    return await this.saleService.update(id, product, category);
  }

  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.saleService.remove(id);
  }
  */

  @Post('/createSale/:iduser/:idorder')
  async create(@Param('iduser') iduser : number, @Param('idorder') idorder : number) : Promise<Sale> {
    return this.saleService.create(iduser, idorder);
  }
}
