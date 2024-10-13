import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from 'src/application/commands/create-product.command';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductQuery } from 'src/application/queries/get-product.query';
import { DeleteProductCommand } from 'src/application/commands/delete-product.command';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { PurchaseProductCommand } from 'src/application/commands/purchase-product.command';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.commandBus.execute(
      new CreateProductCommand(body.name, body.price, body.stock),
    );
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }

  @Patch(':id/purchase')
  async purchase(@Param('id') id: number, @Body() body: PurchaseProductDto) {
    return this.commandBus.execute(
      new PurchaseProductCommand(id, body.quantity),
    );
  }
}
