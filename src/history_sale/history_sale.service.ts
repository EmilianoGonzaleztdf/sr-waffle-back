import { Injectable } from '@nestjs/common';
import { CreateHistorySaleDto } from './dto/create-history_sale.dto';
import { UpdateHistorySaleDto } from './dto/update-history_sale.dto';

@Injectable()
export class HistorySaleService {
  create(createHistorySaleDto: CreateHistorySaleDto) {
    return 'This action adds a new historySale';
  }

  findAll() {
    return `This action returns all historySale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historySale`;
  }

  update(id: number, updateHistorySaleDto: UpdateHistorySaleDto) {
    return `This action updates a #${id} historySale`;
  }

  remove(id: number) {
    return `This action removes a #${id} historySale`;
  }
}
