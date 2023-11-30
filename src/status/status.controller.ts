import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/list')
  async findAll() : Promise<CreateStatusDto[]> {
    return this.statusService.findAll();
  }
  @Get('search/:keyword')
  async searchProductsByKeyword(@Param('keyword') keyword : string) : Promise<CreateStatusDto[]>{
    if(keyword === ''){
      return this.statusService.findAll();
    }
    return this.statusService.searchProductsByKeyword(keyword);
  } ;
  @Patch('/update/:id')
  async update (@Body() status:Status, @Param('id') id : number) : Promise<String>{
    return await this.statusService.update(id, status);
  }
  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.statusService.remove(id);
  }
  @Post('/createCategory')
  async create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }
}