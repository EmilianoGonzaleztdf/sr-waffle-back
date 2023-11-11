import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'category'})
export class Category {

  @PrimaryGeneratedColumn()
  id_category : number ; 

  @Column()
  description : string;

  @OneToMany(()=> Product , product => product.category)
  products : Product[];

  constructor( description : string){
    this.description = description;
  };

  public getid(): number {
    return this.id_category;
  };

  public getDescription(): string {
    return this.description;
  };

  public setDescription( description : string){
    this.description = description;
  };
};
