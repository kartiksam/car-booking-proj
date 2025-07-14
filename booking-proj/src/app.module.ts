import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarBookModule } from './car_book/car_book.module';

@Module({
  imports: [CarBookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
