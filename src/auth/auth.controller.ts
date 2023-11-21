import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register/:id_role')
  register(@Body() createUserDto : CreateUserDto, @Param('id_role') id_role : number){
    return this.authService.register(createUserDto, id_role)
  }

  @Post('login')
  login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto);
  }

  @Get('home')
  @UseGuards(AuthGuard)
  getHome(){
    return "entramos al Home";
  }
}
