import { Category } from 'src/category/entities/category.entity';
import { HistorySale } from 'src/history_sale/entities/history_sale.entity';
import { Order } from 'src/order/entities/order.entity';

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column({ unique: true })
  bar_code: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imgURL: string;

  @Column()
  price: number;
  // relacion una categoria tiene muchos productos
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'fk_id_category' })
  category: Category;

  @OneToOne(() => HistorySale, (historySale) => historySale.product)
  historySale: HistorySale;

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable({
    name: 'order_product',
    joinColumn: { name: 'fk_id_order' },
    inverseJoinColumn: { name: 'fk_id_product' },
  })
  orders: Order[];

  constructor(
    bar_code: number,
    name: string,
    description: string,
    imgURL: string,
    price: number,
  ) {
    this.bar_code = bar_code;
    this.name = name;
    this.description = description;
    this.imgURL = imgURL;
    this.price = price;
  }

  // get
  public getId(): number {
    return this.id_product;
  }
  public getBar_Code(): number {
    return this.bar_code;
  }
  public getName(): string {
    return this.name;
  }
  public getDescription(): string {
    return this.description;
  }
  public getImgURL(): string {
    return this.imgURL;
  }
  public getPrice(): number {
    return this.price;
  }

  //set
  public setBar_Code(bar_Code: number) {
    this.bar_code = bar_Code;
  }
  public setName(name: string) {
    this.name = name;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setImgURL(imgURL: string) {
    this.imgURL = imgURL;
  }
  public setPrice(price: number) {
    this.price = price;
  }
}
