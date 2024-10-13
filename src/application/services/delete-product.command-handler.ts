import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../commands/delete-product.command';
import { ProductRepositoryAdapter } from 'src/infrastructure/persistence/product-repository.adapter';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productRepository: ProductRepositoryAdapter) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const product = await this.productRepository.findById(command.id);
    if (!product) throw new NotFoundException('product not found');

    await this.productRepository.delete(command.id);
  }
}
