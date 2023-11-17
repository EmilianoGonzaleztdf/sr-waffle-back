import { Product } from 'src/product/entities/product.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column()
  date: string;

  @ManyToOne(() => Status, (status) => status.orders)
  @JoinColumn({ name: 'fk_id_status' })
  status: Status;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'fk_id_products' })
  products: Product[];

  @OneToOne(()=>Sale, sale=>sale.order)
  sale:Sale;

  constructor() {}
}