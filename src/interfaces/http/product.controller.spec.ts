import { Test } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PurchaseProductCommand } from 'src/application/commands/purchase-product.command';
import { CreateProductCommand } from 'src/application/commands/create-product.command';
import { DeleteProductCommand } from 'src/application/commands/delete-product.command';
import { GetProductQuery } from 'src/application/queries/get-product.query';

describe('ProductController', () => {
  let productController: ProductController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = moduleRef.get<ProductController>(ProductController);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  it('should call CommandBus.execute with the correct command on purchase', async () => {
    const commandBusExecuteSpy = jest.spyOn(commandBus, 'execute');

    await productController.purchase(1, { quantity: 3 });

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(
      new PurchaseProductCommand(1, 3),
    );
  });

  it('should call CommandBus.execute with the correct command on create', async () => {
    const productData = { name: 'Test Product', price: 100, stock: 10 };
    const commandBusExecuteSpy = jest.spyOn(commandBus, 'execute');

    await productController.createProduct(productData);

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(
      new CreateProductCommand(
        productData.name,
        productData.price,
        productData.stock,
      ),
    );
  });

  it('should call CommandBus.execute with the correct command on delete', async () => {
    const commandBusExecuteSpy = jest.spyOn(commandBus, 'execute');

    await productController.remove(1);

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(
      new DeleteProductCommand(1),
    );
  });

  it('should call QueryBus.execute with the correct query on get by id', async () => {
    const commandBusExecuteSpy = jest.spyOn(queryBus, 'execute');
    const productId = 1;
    const mockProduct = { id: productId, name: 'Test Product', price: 100 };
    commandBusExecuteSpy.mockResolvedValue(mockProduct);

    const result = await productController.findById(productId);

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(
      new GetProductQuery(productId),
    );
    expect(result).toEqual(mockProduct);
  });
});
