import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete, Res} from '@nestjs/common';
import { WafflesService } from './waffles.service';
import path from 'path';
import { Response } from 'express';

@Controller('api')
export class WafflesController {
  constructor (private wafflesService: WafflesService){}

  @Get('waffles/list')
  public getWaffles():any{
    return this.wafflesService.getWaffles();
  }

  @Delete('waffles/delete/:id')
  public getDeleteWaffles(@Param('id', ParseIntPipe) id:number):any{
    return this.wafflesService.getDeleteWaffles(id);
  }
  @Post('waffles/createWaffle')
  public getCreateWafle(@Body()body): string{
    return this.wafflesService.getCreateWaffle(body);
  }
  @Get('waffles/find/:id')
  public getWafflesByID(@Param('id', ParseIntPipe)id:number):any{
    return this.wafflesService.getWafflesByID(id);
  }
  @Get('/images/:imageName')
  public getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = path.resolve(__dirname, '..', 'uploads', imageName);
    return res.sendFile(imagePath);
  }

  }
  