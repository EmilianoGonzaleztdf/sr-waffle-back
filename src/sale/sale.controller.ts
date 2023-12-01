import { Controller, Get, Post, Patch, Param, } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get('/list')
  async findAll() : Promise<CreateSaleDto[]> {
    return this.saleService.findAll();
  }

  @Get('/getSaleByIdRelations/:id_sale')
  async getOrderByIdRelations(@Param('id_sale') id_sale: number) {
    return await this.saleService.getSaleByIdRelations(id_sale);
  }

  @Post('/createSale/:id_user/:id_order')
  async createSale(@Param('id_user') id_user : number, @Param('id_order') id_order : number) : Promise<Sale> {
    return this.saleService.createSale(id_user, id_order);
  }

  @Patch('/updateOrderUserById/:id_user/:id_order')
  async updateOrderUserById(@Param('id_user') id_user : number, @Param('id_order') id_order : number) : Promise<any> {
    return this.saleService.updateOrderUserById(id_user, id_order);
  }
}
