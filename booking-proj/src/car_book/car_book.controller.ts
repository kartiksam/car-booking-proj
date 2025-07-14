import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarBookService } from './car_book.service';
import { CreateCarBookDto } from './dto/create-car_book.dto';
import { UpdateCarBookDto } from './dto/update-car_book.dto';

@Controller('car-book')
export class CarBookController {
  constructor(private readonly carBookService: CarBookService) {}

  @Post()
  create(@Body() createCarBookDto: CreateCarBookDto) {
    return this.carBookService.create(createCarBookDto);
  }

  @Get()
  findAll() {
    return this.carBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarBookDto: UpdateCarBookDto) {
    return this.carBookService.update(+id, updateCarBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carBookService.remove(+id);
  }
}
