import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<CreateSaleDto[]> {
    return await this.saleRepository.find();
  }
/*
  async searchSlaeByKeyword(keyword: string): Promise<Sale[]> {
    if (keyword === '') {
      return this.saleRepository.find(); // Devuelve todos las ventas si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.saleRepository
      .createQueryBuilder('sale')
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
  */

  async create(iduser: number, idorder: number): Promise<Sale> {
    const criteriaUser: FindOneOptions = { where: { id_user: iduser } };
    const user: User = await this.userRepository.findOne(criteriaUser);
    if (!user) {
      throw new Error('no se encontro el usuario que realizó la venta ');
    }
    const criteriaOrder: FindOneOptions = { where: { id_order: idorder } };
    const order: Order= await this.orderRepository.findOne(criteriaOrder);
    if (!order) {
      throw new Error('no se encontro la orden de la venta ');
    } else {
      //const { bar_code, name, description, imgURL, price} = createSaleDto;
      const newSale = new Sale();
      newSale.user = user;
      const newOrder = new Order();
      newSale.order = order;
      const savedSale = await this.saleRepository.save(newSale);
      return savedSale;
    }
  }
}
