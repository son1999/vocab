import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import * as path from 'path';

export interface VocabEntry {
  word: string;
  definition: string;
  example: string;
}

@Injectable()
export class ExcelService {
  private get filePath(): string {
    // Ưu tiên biến môi trường (phục vụ khi chạy trong Docker): /data/vocab.xlsx
    if (process.env.EXCEL_FILE && process.env.EXCEL_FILE.trim()) {
      return process.env.EXCEL_FILE;
    }
    // Mặc định khi chạy dev: dùng file tại src/vocab.xlsx (cùng repo với mã nguồn)
    return path.resolve(process.cwd(), 'src', 'vocab.xlsx');
  }

  private async ensureFileDir() {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
  }

  async readAll(): Promise<VocabEntry[]> {
    try {
      // Nếu file chưa tồn tại, trả mảng rỗng
      try {
        await fs.access(this.filePath);
      } catch {
        return [];
      }

      const workbook = XLSX.readFile(this.filePath);
      const sheetName = workbook.SheetNames[0];
      if (!sheetName) return [];
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) return [];
      const data = XLSX.utils.sheet_to_json<VocabEntry>(worksheet, { defval: '' });
      return data;
    } catch (e) {
      throw new InternalServerErrorException('Failed to read excel file');
    }
  }

  async append(entry: VocabEntry): Promise<void> {
    try {
      await this.ensureFileDir();

      let data: VocabEntry[] = [];
      try {
        data = await this.readAll();
      } catch {
        data = [];
      }

      data.push(entry);

      // Đảm bảo thứ tự cột ổn định: word, definition, example
      const worksheet = XLSX.utils.json_to_sheet(data, {
        header: ['word', 'definition', 'example'],
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vocabulary');
      XLSX.writeFile(workbook, this.filePath);
    } catch (e) {
      throw new InternalServerErrorException('Failed to write excel file');
    }
  }

  async getFileBuffer(): Promise<Buffer> {
    try {
      // Nếu file chưa tồn tại, tạo file rỗng với header
      try {
        await fs.access(this.filePath);
      } catch {
        const worksheet = XLSX.utils.json_to_sheet<VocabEntry>([], {
          header: ['word', 'definition', 'example'],
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Vocabulary');
        XLSX.writeFile(workbook, this.filePath);
      }
      const buf = await fs.readFile(this.filePath);
      return buf as Buffer;
    } catch (e) {
      throw new InternalServerErrorException('Failed to read excel file');
    }
  }
}

