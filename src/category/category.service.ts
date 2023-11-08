import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>
  ){};
  
  async findAll() : Promise<CreateCategoryDto[]> {
    return await this.categoryRepository.find();
  }
  async searchProductsByKeyword(keyword: string): Promise<Category[]> {
    let filter = 'LOWER(category.description) LIKE :keyword';
    if (keyword === '') {
      return this.categoryRepository.find(); // Devuelve todos los productos si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.categoryRepository
      .createQueryBuilder('category')
      .where(filter, { keyword: `%${keyword}%` })
      .getMany();
  }

  async update(id: number, createCategory: CreateCategoryDto) {
    const criteria : FindOneOptions = { where : { id_product : id}};
    let category : Category = await this.categoryRepository.findOne(criteria);
    if (!category) {
      throw new Error('no se pudo encontrar la categoria a modificar');
    } else {
      category.setDescription(createCategory.description);
      category = await this.categoryRepository.save(category);
      return ('se cambio la descripcion de la categoria')
    }
  }

  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_category: id } };
    let category : Category = await this.categoryRepository.findOne(criteria);
      if(category){
        await this.categoryRepository.remove(category);
        return true;
      } else throw new Error('no se encontro el producto a eliminar');
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const {description} = createCategoryDto;
    const newCategory = this.categoryRepository.create({ description });
    const savedCategory = await this.categoryRepository.save(newCategory);
    return savedCategory;
  }
}
