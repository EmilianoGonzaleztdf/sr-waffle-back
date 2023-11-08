import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  async findAll() : Promise<CreateCategoryDto[]> {
    return this.categoryService.findAll();
  }
  
  @Get('search/:keyword')
  async searchProductsByKeyword(@Param('keyword') keyword : string) : Promise<CreateCategoryDto[]>{
    if(keyword === ''){
      return this.categoryService.findAll();
    }
    return this.categoryService.searchProductsByKeyword(keyword);
  } ;

  @Patch('/update/:id')
  async update (@Body() category:Category, @Param('id') id : number) : Promise<String>{
    return await this.categoryService.update(id, category);
  }

  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.categoryService.remove(id);
  }
  @Post('/createProduct')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }


}
