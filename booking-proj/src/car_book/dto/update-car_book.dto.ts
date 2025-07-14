import { PartialType } from '@nestjs/mapped-types';
import { CreateCarBookDto } from './create-car_book.dto';

export class UpdateCarBookDto extends PartialType(CreateCarBookDto) {}
