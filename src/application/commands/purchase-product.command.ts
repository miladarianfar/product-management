export class PurchaseProductCommand {
  constructor(
    public readonly id: number,
    public readonly quantity: number,
  ) {}
}
