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
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column({ unique: true })
  bar_code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imgURL: string;

  @Column()
  price: number;
  @Column()
  status: boolean;


  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'fk_id_category' })
  category: Category;

  @OneToMany(() => HistorySale, (historySale) => historySale.product)
  historySale: HistorySale[];

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable({
    name: 'order_product',
    joinColumn: { name: 'fk_id_product' },
    inverseJoinColumn: { name: 'fk_id_order' },
  })
  orders: Order[];
  
  constructor(
    bar_code: string,
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
    this.status = true;
  }

  public getId(): number {
    return this.id_product;
  }
  public getBar_Code(): string {
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
  public getStatus(): boolean{
    return this.status;
  }

  public setBar_Code(bar_Code: string) {
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
  public setStatus(status: boolean) {
    this.status = status;
  }
}
