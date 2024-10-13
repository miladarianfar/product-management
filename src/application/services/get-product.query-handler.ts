import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from 'src/application/queries/get-product.query';
import { Product } from 'src/domain/entities/product.entity';
import { ProductRepositoryAdapter } from 'src/infrastructure/persistence/product-repository.adapter';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepositoryAdapter) {}

  async execute(query: GetProductQuery): Promise<Product> {
    const product = await this.productRepository.findById(query.id);
    if (!product) throw new NotFoundException('product not found');

    return product;
  }
}
