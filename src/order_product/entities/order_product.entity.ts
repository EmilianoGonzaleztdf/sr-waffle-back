import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_product' })
export class OrderProduct {
  @PrimaryColumn({ name: 'fk_id_order' })
  fk_id_order: number;

  @PrimaryColumn({ name: 'fk_id_product' })
  fk_id_product: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.quantity)
  @JoinColumn({ name: 'fk_id_product' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.quantities)
  @JoinColumn({ name: 'fk_id_order' })
  order: Order;

  // GET
  public getQuantity(): number {
    return this.quantity;
  }

  // SET
  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
