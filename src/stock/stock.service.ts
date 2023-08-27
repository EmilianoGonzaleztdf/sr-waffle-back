import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  stock = [
    { id: 0, barcode: "123123123", description: 'harina x kg', brand: 'molino Don Sergio', quantity: 10, supplier : 'sanchez sas' },
    { id: 1, barcode: "123123444", description: 'huevo x unidad', brand: 'Hueveria JC', quantity: 120, supplier : 'chavarria sa'  },
    { id: 2, barcode: "222233333", description: 'azucar x 1kg', brand: 'Molino MLZ', quantity: 10 , supplier : 'zabala distribuidora' },
    { id: 3, barcode: "123122222", description: 'helado crema americana x KG', brand: 'grido', quantity: 10, supplier : 'gonzalez sa'  },
    { id: 4, barcode: "123123566", description: 'salsa frutilla 500cc', brand: 'marolio', quantity: 5 , supplier : 'frias srl' },
    { id: 5, barcode: "123988758", description: 'aceite de girasol 5L', brand: 'cocinero', quantity: 5 , supplier : 'diarco' }
  ];

  public getStock(): any {
    return this.stock;
  }
  public searchStockByKeyword(keyword: string): any[] {
    if (!keyword) {
      return this.stock; // Devuelve todos los usuarios si el keyword está vacío
    }
  
    keyword = keyword.toLowerCase();
    return this.stock.filter(
      (stock) =>
        stock.barcode.toLowerCase().includes(keyword) ||
        stock.description.toLowerCase().includes(keyword) ||
        stock.brand.toLowerCase().includes(keyword) ||
        stock.supplier.toLowerCase().includes(keyword)
    );
  };
  public postCreateStockItem(body): string {
    this.stock.push(body);
    return `The stock item was added with the following attributes:
    id: ${body.id}
    barcode: ${body.barcode}
    description: ${body.description}
    brand: ${body.brand}
    quantity: ${body.quantity}
    supplier : ${body.supplier}
    `;
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
