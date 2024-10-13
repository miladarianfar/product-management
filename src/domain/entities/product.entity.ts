export class Product {
  private id: number;
  private name: string;
  private price: number;
  private stock: number;

  constructor(id: number, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  public purchase(quantity: number): void {
    this.stock -= quantity;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getStock(): number {
    return this.stock;
  }

  public setStock(stock: number): void {
    this.stock = stock;
  }
}
