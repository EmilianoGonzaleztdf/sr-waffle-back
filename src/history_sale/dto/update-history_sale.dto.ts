import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorySaleDto } from './create-history_sale.dto';

export class UpdateHistorySaleDto extends PartialType(CreateHistorySaleDto) {}
