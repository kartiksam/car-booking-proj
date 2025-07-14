import { Test, TestingModule } from '@nestjs/testing';
import { CarBookService } from './car_book.service';

describe('CarBookService', () => {
  let service: CarBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarBookService],
    }).compile();

    service = module.get<CarBookService>(CarBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
