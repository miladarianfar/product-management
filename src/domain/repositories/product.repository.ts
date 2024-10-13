import { Product } from 'src/domain/entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
