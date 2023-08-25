import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete,Put, Query} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('/list')
  public getUsers(): any {
    return this.usersService.getUsers();
  }
  @Get('search/:keyword')
  searchUsers(@Param('keyword') keyword: string): any[] {
    return this.usersService.searchUsersByKeyword(keyword);
  }
  @Post('/createUser')
  public postCreateUser(@Body()body): string {
    return this.usersService.postCreateUser(body);
  }
  @Delete('/delete/:id')
  public getDeleteUsertID(@Param('id',ParseIntPipe)id:number):any{
    return this.usersService.getDeleteUserID(id);
  }
  @Put('/update/:id')
  public updateUserByID(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return this.usersService.updateUserByID(id, body);
  }
}

