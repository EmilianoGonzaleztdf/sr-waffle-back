import { Product } from "src/product/entities/product.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'history_sale'})
export class HistorySale {

    // ATRIBUTOS
    @PrimaryGeneratedColumn()
    id_history_sale : number;

    @Column()
    price_of_date_of_sale : number;

    @Column()
    date: string;
    // RELACIONES

    @ManyToOne(()=>Sale, sale=>sale.historySale)
    @JoinColumn({name : "fk_id_sale"})
    sale:Sale;

    
    @ManyToOne(()=>Product, product=>product.historySale)
    @JoinColumn({name : 'fk_id_product'})
    product:Product;
    /*
    En product:

    @OneToOne(()=>HistorySale, historySale=>historySale.product)
    historySale:HistorySale;
    */

    // CONSTRUCTOR

    constructor(podos : number) {
        this.price_of_date_of_sale = podos;
    }

    // GET

    public getId(): number {
        return this.id_history_sale;
    }

    public getPriceOfDateOfSale(): number {
        return this.price_of_date_of_sale;
    }

    // SET

    public setPriceOfDateOfSale(podos : number) {
        this.price_of_date_of_sale = podos;
    }
}
