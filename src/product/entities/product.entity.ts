import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @PrimaryColumn({ unique: true })
  bar_code: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imgURL: string;

  @Column()
  price: number;

  constructor(
    bar_code: number,
    name: string,
    description: string,
    imgURL: string,
    price: number,
  ) {
    this.bar_code = bar_code;
    this.name = name;
    this.description = description;
    this.imgURL = imgURL;
    this.price = price;
  }

  // get
  public getId(): number {
    return this.id_product;
  }
  public getBar_Code(): number {
    return this.bar_code;
  }
  public getName(): string {
    return this.name;
  }
  public getDescription(): string {
    return this.description;
  }
  public getImgURL(): string {
    return this.imgURL;
  }
  public getPrice(): number {
    return this.price;
  }

  //set
  public setBar_Code(bar_Code: number) {
    this.bar_code = bar_Code;
  }
  public setName(name: string) {
    this.name = name;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setImgURL(imgURL: string) {
    this.imgURL = imgURL;
  }
  public setPrice(price: number) {
    this.price = price;
  }
}
