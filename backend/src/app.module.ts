import { Module } from '@nestjs/common';
import { ExcelService } from './excel/excel.service';
import { ExcelController } from './excel/excel.controller';

@Module({
  imports: [],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class AppModule {}

