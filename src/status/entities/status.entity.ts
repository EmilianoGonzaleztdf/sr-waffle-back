import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'status'})
export class Status {
  @PrimaryGeneratedColumn()
  id_status: string;

  @Column({ unique: true })
  description: string;

  @OneToMany(()=> Order , order => order.status)
  orders : Order[];

constructor(description : string){
  this.description = description;
}

public getId_status(): string{
  return this.id_status;
}
public getDescription(): string{
  return this.description;
}

public setDescription(description : string){
  this.description = description;
}
}
