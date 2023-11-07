import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  async findAll() : Promise<CreateProductDto[]> {
    return this.productService.findAll();
  }
  
  @Get('search/:keyword')
  async searchProductsByKeyword(@Param('keyword') keyword : string) : Promise<CreateProductDto[]>{
    if(keyword === ''){
      return this.productService.findAll();
    }
    return this.productService.searchProductsByKeyword(keyword);
  } ;

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  @Post('/createProduct')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

}
