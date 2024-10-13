import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductCommand } from '../commands/create-product.command';
import { ProductRepositoryAdapter } from 'src/infrastructure/persistence/product-repository.adapter';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productRepository: ProductRepositoryAdapter) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { name, price, stock } = command;
    const product = new Product(0, name, price, stock);
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }
}
