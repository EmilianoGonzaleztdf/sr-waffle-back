import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sale'})
export class Sale {

    // ATRIBUTOS
    @PrimaryGeneratedColumn()
    id_sale: number;

    // CONSTRUCTOR
    constructor(){}

    // GET

    public getId(): number {
        return this.id_sale;
    }

    // SET
}
