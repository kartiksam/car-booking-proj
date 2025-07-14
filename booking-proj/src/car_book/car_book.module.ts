import { Module } from '@nestjs/common';
import { CarBookService } from './car_book.service';
import { CarBookController } from './car_book.controller';

@Module({
  controllers: [CarBookController],
  providers: [CarBookService],
})
export class CarBookModule {}
