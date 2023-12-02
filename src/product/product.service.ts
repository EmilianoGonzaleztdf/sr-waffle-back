import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<CreateProductDto[]> {
    return await this.productRepository.find();
  }

  async searchProductsByKeyword(keyword: string): Promise<Product[]> {
    if (keyword === '') {
      return this.productRepository.find();
    }
    keyword = keyword.toLowerCase();
    return this.productRepository
      .createQueryBuilder('product')
      .where(
        'LOWER(product.name) LIKE :keyword OR LOWER(product.description) LIKE :keyword OR LOWER(product.bar_code) LIKE :keyword',
        { keyword: `%${keyword}%` },
      )
      .getMany();
  }
  async update(id: number, createProduct: CreateProductDto, category : number) {
    const criteria: FindOneOptions = { where: { id_product: id } };
    let product: Product = await this.productRepository.findOne(criteria);
    if (!product) {
      throw new Error('no se pudo encontrar el producto a modificar');
    }
    const criteriaCat: FindOneOptions = { where: { id_category: category } };
    const categoria: Category = await this.categoryRepository.findOne(criteriaCat);
    console.log(categoria);
    if(!categoria) {
      throw new Error('no se pudo encontrar la categoria a modificar');
    } else {
      product.setBar_Code(createProduct.bar_code);
      product.setDescription(createProduct.description);
      product.setImgURL(createProduct.imgURL);
      product.setName(createProduct.name);
      product.setPrice(createProduct.price);
      product.setStatus(createProduct.status);
      product.category = categoria;
      product = await this.productRepository.save(product);
      return 'se cambio el producto';
    }
  }
  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_product: id } };
    let product: Product = await this.productRepository.findOne(criteria);
    if (product) {
      await this.productRepository.remove(product);
      return true;
    } else throw new Error('no se encontro el producto a eliminar');
  }
  async create(createProductDto: CreateProductDto,id_category: number,): Promise<Product> {
    const criteriaCategory: FindOneOptions = { where: { id_category: id_category } };
    const category: Category = await this.categoryRepository.findOne(criteriaCategory);
    if (!category) {
      throw new Error('no se encontro la categoria del producto a crear ');
    } else {
      const { bar_code, name, description, imgURL, price} = createProductDto;
      const newProduct = new Product(
        bar_code,
        name,
        description,
        imgURL,
        price,
        
      );
      newProduct.category = category;
      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct;
    }
  }
  async findAllProductForWithRelations(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
    });
    return products;
  }
}
