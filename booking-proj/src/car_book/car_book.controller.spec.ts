import { Test, TestingModule } from '@nestjs/testing';
import { CarBookController } from './car_book.controller';
import { CarBookService } from './car_book.service';

describe('CarBookController', () => {
  let controller: CarBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarBookController],
      providers: [CarBookService],
    }).compile();

    controller = module.get<CarBookController>(CarBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
