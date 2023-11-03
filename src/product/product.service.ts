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
/* async searchProductByKeyword(keyword : string): Promise<CreateProductDto[]> {
    if(!keyword) {
      return await this.productRepository.find();
    } keyword = keyword.toLocaleLowerCase();
    return await this.productRepository.findOne({where: {keyword: keyword})
  }
*/
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }
}
