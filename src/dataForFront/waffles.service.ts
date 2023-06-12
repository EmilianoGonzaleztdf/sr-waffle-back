import { Injectable } from '@nestjs/common';

@Injectable()
export class WafflesService {
  //-----------------------waffles from memory --------------------//
  waffles = [
    {id:0, name : 'Waffle Sergio' , description : "1 bocha de helado sabor Crema americana , 1 bocha de helado sabor vainilla, topping de chispitas de chocolate, salsa de frutilla", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:1, name : 'Waffle Emiliano' , description : "2 bochas de helado sabor DDL granizado, toppins de frutilla, salsa de DDL", imgUrl : 'https://i.ibb.co/TbYgZx3/w2.jpg' , price : 3000},
    {id:2, name : 'Waffle Maria' , description : "1 bocha de helado sabor Crema Americana, 1 bocha de helado sabor Chocolate, toppins de almendra, salsa dulce de leche", imgUrl : 'https://i.ibb.co/tHSYb5G/w3.jpg' , price : 1500},
    {id:3, name : 'Waffle3' , description : "1 bochas de helado, toppins de sandia , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 150},
    {id:4, name : 'Waffle4' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:5, name : 'Waffle5' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:6, name : 'Waffle6' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:7, name : 'Waffle7' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
    {id:8, name : 'Waffle8' , description : "1 bochas de helado, toppins de chocolate , salsa de dulce de leche", imgUrl : "https://i.ibb.co/pb1jSL7/w1.jpg" , price : 1500},
  ]
  

  public getWaffles(): any{
    return this.waffles
  }

  public getDeleteWaffles(id: number): any{
    let waffleExists = false;
    let wafflePosition = 0;
    for (let i = 0; i < this.waffles.length; i++){
      if(id==this.waffles[i].id){
        waffleExists = true;
        wafflePosition = i -1;
      }
    } if (waffleExists){
      this.waffles.splice(wafflePosition,1);
      return {
        "msj":`se elimino el waffle ${id}`,
        "waffle" : this.waffles[wafflePosition]
    }
    } else {
      return {"msj": `Cannot find requested waffle with ID: ${id}`}
    }
  }

  public getCreateWaffle(body):string{
    this.waffles.push(body)
    return (
      `se creo el waffle con los siguientes atributos: 
      id : ${body.id}
      name: ${body.name}
      description: ${body.description}
      imgURL: ${body.imgURL}
      price : ${body.price}
      `
    )
  }

  public getWafflesByID(id: number):any{
    let waffle = this.waffles.find(p => p.id === id);
    let waffleAux = [];
    waffleAux.push(waffle);
    return waffle;
  }
  


}
