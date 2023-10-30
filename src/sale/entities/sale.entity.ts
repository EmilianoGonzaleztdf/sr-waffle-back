import { HistorySale } from "src/history_sale/entities/history_sale.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sale'})
export class Sale {

    // ATRIBUTOS
    @PrimaryGeneratedColumn()
    id_sale: number;

    // RELACIONES

    @ManyToOne(()=>User, user=>user.sales)
    @JoinColumn({name : "fk_id_user"})
    user:User;

    @OneToOne(()=>HistorySale, historySale=>historySale.sale)
    historySale:HistorySale;

    // CONSTRUCTOR
    constructor(){}

    // GET

    public getId(): number {
        return this.id_sale;
    }

    // SET
}
