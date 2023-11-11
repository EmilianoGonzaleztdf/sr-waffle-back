import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('/list')
  async findAll() : Promise<CreateUserDto[]> {
    return await this.userService.findAll();
  }

  @Get('search/:keyword')
  async searchUsers(@Param('keyword') keyword: string) : Promise<CreateUserDto[]> {
    if (keyword === "") { // Usa === para comparar
      return this.userService.findAll();
    }
    return this.userService.searchUsersByKeyword(keyword);
  }

  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUserDto) : Promise<String> {
    return this.userService.update(id, createUserDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.remove(id);
  }
}
