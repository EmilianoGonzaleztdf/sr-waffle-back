import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  stock = [
    { id: 0, name: 'harina x kg', brand: 'molino Sergio', quantity: 10 },
    { id: 1, name: 'huevo x unidad', brand: 'sabradios', quantity: 120 },
    { id: 2, name: 'azucar x 1kg', brand: '', quantity: 10 },
    { id: 3, name: 'helado crema americana x KG', brand: 'grido', quantity: 10 },
    { id: 4, name: 'salsa frutilla 500cc', brand: 'marolio', quantity: 5 },
    { id: 5, name: 'aceite de girasol 5L', brand: 'cocinero', quantity: 5 }
  ];

  public getStock(): any {
    return this.stock;
  }

  public postCreateStockItem(body): string {
    this.stock.push(body);
    return `The stock item was added with the following attributes:
    id: ${body.id}
    name: ${body.name}
    brand: ${body.brand}
    quantity: ${body.quantity}
    `;
  }

  public getFindStockItemByID(id: number): any {
    let item = this.stock.find((p) => p.id === id);
    let itemAux = [];
    itemAux.push(item);
    return itemAux;
  }

  public getFindStockItemByName(name: string): any {
    let item = this.stock.find((p) => p.name === name);
    let itemAux = [];
    itemAux.push(item);
    return itemAux;
  }

  public getDeleteStockItemByID(id: number): any {
    let itemExists = false;
    let itemPosition = 0;
    for (let i = 0; i < this.stock.length; i++) {
      if (id == this.stock[i].id) {
        itemExists = true;
        itemPosition = i;
      }
    }
    if (itemExists) {
      this.stock.splice(itemPosition, 1);
      return {
        msj: `Stock item ${id} was removed`,
        item: this.stock[itemPosition],
      };
    } else {
      return { msj: `Cannot find requested stock item with ID: ${id}` };
    }
  }
}
