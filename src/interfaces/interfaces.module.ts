import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { ProductController } from './http/product.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ApplicationModule, CqrsModule],
  controllers: [ProductController],
})
export class InterfacesModule {}
