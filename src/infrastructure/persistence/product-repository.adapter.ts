import { Product } from 'src/domain/entities/product.entity';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductEntity } from '../database/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const productEntity = this.toDatabaseEntity(product);
    const newProduct = await this.productRepository.save(productEntity);
    return this.toDomainEntity(newProduct);
  }

  async findById(id: number): Promise<Product | null> {
    const productEntity = await this.productRepository.findOneBy({ id });
    return productEntity ? this.toDomainEntity(productEntity) : null;
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete({ id });
  }

  private toDatabaseEntity(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = product.getId();
    productEntity.name = product.getName();
    productEntity.price = product.getPrice();
    productEntity.stock = product.getStock();

    return productEntity;
  }

  private toDomainEntity(product: ProductEntity): Product {
    return new Product(product.id, product.name, product.price, product.stock);
  }
}
