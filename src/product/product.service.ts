import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository : Repository<Product>
  ){};

  async findAll(): Promise<CreateProductDto[]> {
    return await this.productRepository.find();
  }

  async searchProductsByKeyword(keyword: string): Promise<Product[]> {
    if (keyword === '') {
      return this.productRepository.find(); // Devuelve todos los productos si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE :keyword OR LOWER(product.description) LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { bar_code, name, description, imgURL, price } = createProductDto;

    const newProduct = this.productRepository.create({ bar_code, name, description, imgURL, price
    });

    const savedProduct = await this.productRepository.save(newProduct);

    return savedProduct;
  }
}
