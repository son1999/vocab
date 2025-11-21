import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExcelService, VocabEntry } from './excel.service';

@Controller('vocab')
export class ExcelController {
  constructor(private readonly excel: ExcelService) {}

  @Get()
  async getAll(): Promise<VocabEntry[]> {
    return this.excel.readAll();
  }

  @Get('file')
  async download(@Res() res: Response) {
    const buf = await this.excel.getFileBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="vocab.xlsx"');
    res.send(buf);
  }

  @Post()
  async add(@Body() body: Partial<VocabEntry>) {
    const entry: VocabEntry = {
      word: String(body.word ?? '').trim(),
      definition: String(body.definition ?? '').trim(),
      example: String(body.example ?? '').trim(),
    };

    if (!entry.word || !entry.definition || !entry.example) {
      throw new HttpException('word, definition, example are required', HttpStatus.BAD_REQUEST);
    }

    await this.excel.append(entry);
    return { message: 'ok' };
  }
}

