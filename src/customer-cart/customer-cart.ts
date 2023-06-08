export class CustomerCart {
  private id : number;
  private name : string;
  private description : string;
  private price : number;
  private quantity : number;

  constructor(id:number, name:string, description:string, price:number,quantity:number){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }

  public getId():number { return this.id};
  public getName():string { return this.name};
  public getDescription():string { return this.description};
  public getPrice():number { return this.price};
  public getQuantity():number { return this.quantity};
  
}
