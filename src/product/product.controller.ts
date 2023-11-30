import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

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
  @Patch('/update/:id/:category')
  async update (@Body() product:Product, @Param('id') id : number,@Param('category') category : number) : Promise<String>{
    return await this.productService.update(id, product, category);
  }
  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.productService.remove(id);
  }
  @Post('/createProduct/:id')
  async create(@Body() createProductDto: CreateProductDto, @Param('id') id : number) : Promise<Product> {
    return this.productService.create(createProductDto, id);
  }
}
