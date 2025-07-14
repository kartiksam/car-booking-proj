import { Injectable } from '@nestjs/common';
import { CreateCarBookDto } from './dto/create-car_book.dto';
import { UpdateCarBookDto } from './dto/update-car_book.dto';

@Injectable()
export class CarBookService {
  create(createCarBookDto: CreateCarBookDto) {
    return 'This action adds a new carBook';
  }

  findAll() {
    return `This action returns all carBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carBook`;
  }

  update(id: number, updateCarBookDto: UpdateCarBookDto) {
    return `This action updates a #${id} carBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} carBook`;
  }
}
