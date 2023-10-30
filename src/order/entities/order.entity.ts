import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'order'})
export class Order {
  @PrimaryGeneratedColumn()
  id_order : number;

  @Column()
  date : Date;

  constructor(){

  }
}
