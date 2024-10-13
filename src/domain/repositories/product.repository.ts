import { Product } from '../entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: number): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
