import { HistorySale } from "src/history_sale/entities/history_sale.entity";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sale'})
export class Sale {

    @PrimaryGeneratedColumn()
    id_sale: number;

    @ManyToOne(()=>User, user=>user.sales)
    @JoinColumn({name : "fk_id_user"})
    user:User;

    @OneToMany(()=>HistorySale, historySale=>historySale.sale)
    historySale:HistorySale[];

    @OneToOne(()=>Order, order=>order.sale)
    @JoinColumn({name : "fk_id_order"})
    order:Order;

    constructor(){}

    public getId(): number {
        return this.id_sale;
    }
}
