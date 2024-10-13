import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductCommandHandler } from './services/create-product.command-handler';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { GetProductQueryHandler } from './services/get-product.query-handler';
import { DeleteProductCommandHandler } from './services/delete-product.command-handler';
import { PurchaseProductCommandHandler } from './services/purchase-product.command-handler';

const CommandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  PurchaseProductCommandHandler,
];
const QueryHandlers = [GetProductQueryHandler];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
