import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  // muestra todas las ventas
  @Get('/list')
  async findAll() : Promise<CreateSaleDto[]> {
    return this.saleService.findAll();
  }
  // muestra una venta por ID
  @Get('/getSaleByIdRelations/:id_sale')
  async getOrderByIdRelations(@Param('id_sale') id_sale: number) {
    return await this.saleService.getSaleByIdRelations(id_sale);
  }
    // crea una venta (localhost:3001/sale/createSale/2/43) 2 es el del usuario y 45 el ID de la orden
  @Post('/createSale/:id_user/:id_order')
  async createSale(@Param('id_user') id_user : number, @Param('id_order') id_order : number) : Promise<Sale> {
    return this.saleService.createSale(id_user, id_order);
  }
  // se cambia el usuario que realizo la venta (localhost:3001/sale/updateOrderUserById/2/6) 2 es la ID del usuario y 6 la ID de la venta
  @Patch('/updateOrderUserById/:id_user/:id_order')
  async updateOrderUserById(@Param('id_user') id_user : number, @Param('id_order') id_order : number) : Promise<any> {
    return this.saleService.updateOrderUserById(id_user, id_order);
  }

}
