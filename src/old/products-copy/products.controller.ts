import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete,Put} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService){}

  @Post('/createProduct')
  public postCreateProduct(@Body()body): string {
    return this.productsService.postCreateProduct(body);
  }
  
  @Get('/list')
  public getProducts(): any {
    return this.productsService.getProducts();
  }
  @Get('search/:keyword')
  searchUsers(@Param('keyword') keyword: string): any[] {
    if (keyword === "") { // Usa === para comparar
      return this.productsService.getProducts();
    }
    return this.productsService.searchProductsByKeyword(keyword);
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
