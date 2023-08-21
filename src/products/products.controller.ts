import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete,Put} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService){}

  @Get('/list')
  public getProducts(): any {
    return this.productsService.getProducts();
  }
  @Post('/createProduct')
  public postCreateProduct(@Body()body): string {
    return this.productsService.postCreateProduct(body);
  }
  @Get('/find/:id')
  public getFindProductID(@Param('id',ParseIntPipe)id:number):any{
    return this.productsService.getFindProductID(id);
  }
  @Get('/findName/:name')
  public getFindProductName(@Param('name')name:string):any{
    return this.productsService.getFindProductName(name);
  }
  @Delete('/delete/:id')
  public getDeleteProductID(@Param('id',ParseIntPipe)id:number):any{
    return this.productsService.getDeleteProductID(id);
  }
  @Put('/update/:id')
  public updateProductByID(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return this.productsService.updateProductByID(id, body);
  }
}
