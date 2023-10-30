import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'history_sale'})
export class HistorySale {

    // ATRIBUTOS
    @PrimaryGeneratedColumn()
    id_history_sale : number;

    @Column()
    price_of_date_of_sale : number;

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
