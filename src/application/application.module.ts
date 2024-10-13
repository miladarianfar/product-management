import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductCommandHandler } from './services/create-product.command-handler';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

const CommandHandlers = [CreateProductCommandHandler];
const QueryHandlers = [];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
