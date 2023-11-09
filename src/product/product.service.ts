import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';

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
      .where('LOWER(product.name) LIKE :keyword OR LOWER(product.description) LIKE :keyword OR LOWER(product.bar_code) LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  async update(id: number, createProduct: CreateProductDto) {
    const criteria : FindOneOptions = { where : { id_product : id}};
    let product : Product = await this.productRepository.findOne(criteria);
    if (!product) {
      throw new Error('no se pudo encontrar el producto a modificar');
    } else {
      product.setBar_Code(createProduct.bar_code);
      product.setDescription(createProduct.description);
      product.setImgURL(createProduct.imgURL);
      product.setName(createProduct.name);
      product.setPrice(createProduct.price);
      product = await this.productRepository.save(product);
      return ('se cambio el producto')
    }
  }

  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_product: id } };
    let product : Product = await this.productRepository.findOne(criteria);
      if(product){
        await this.productRepository.remove(product);
        return true;
      } else throw new Error('no se encontro el producto a eliminar');
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { bar_code, name, description, imgURL, price, fk_id_category } = createProductDto;
    const newProduct = this.productRepository.create({ bar_code, name, description, imgURL, price,fk_id_category
    });
    const savedProduct = await this.productRepository.save(newProduct);
    return savedProduct;
  }
}
