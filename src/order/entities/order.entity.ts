import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
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

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column()
  date: Date;

  @ManyToOne(() => Status, (status) => status.orders)
  @JoinColumn({ name: 'fk_id_status' })
  status: Status;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];

  constructor() {}
}
