import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Product } from 'src/product/entities/product.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Status, (status) => status.orders)
  @JoinColumn({ name: 'fk_id_status' })
  status: Status;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({
    name: 'order_product',
    joinColumn: { name: 'fk_id_order' },
    inverseJoinColumn: { name: 'fk_id_product' },
  })
  products: Product[];

  @OneToMany(() => OrderProduct, (quantities) => quantities.order)
  quantities: OrderProduct[];

  @OneToOne(() => Sale, (sale) => sale.order)
  sale: Sale;

  constructor() {
  }
}
  /*
  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];
  */