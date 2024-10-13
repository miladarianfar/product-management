import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseProductCommand } from '../commands/purchase-product.command';
import { ProductRepositoryAdapter } from 'src/infrastructure/persistence/product-repository.adapter';
import { Product } from 'src/domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(PurchaseProductCommand)
export class PurchaseProductCommandHandler
  implements ICommandHandler<PurchaseProductCommand>
{
  constructor(private readonly productRepository: ProductRepositoryAdapter) {}

  async execute(command: PurchaseProductCommand): Promise<Product> {
    const product = await this.productRepository.purchase(
      command.id,
      command.quantity,
    );
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
