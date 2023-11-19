import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService : UserService,
    private jwtService : JwtService
              ){}
  
  async register(createUserDto:CreateUserDto , id_role:number){
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if(user){
      throw new BadRequestException('usted ya se encuentra registrado')
    }
    const pass_encryp = await bcrypt.hash(createUserDto.password , 10); 
    return await this.userService.create( new User (createUserDto.email, createUserDto.user, pass_encryp,createUserDto.status), id_role)
  }


// async login ({email , password}: LoginDto) es igual a: async login (loginDto: LoginDto)
  async login (loginDto: LoginDto){
    const user : User = await this.userService.findOneByEmail(loginDto.email);
    console.log(user);
    // verifico si el usuario existe
    if(!user)
    throw new UnauthorizedException('usuario incorrecto');
    // guardo en un variable (boolean) si el password no encriptado y el encriptado son iguales
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
    if(!isPasswordValid)
    throw new UnauthorizedException('password incorrecto');
  // es mala practica informar si el password o usuario es incorrecto - usar msj de usuario o password incorrecto

  // implemento jwt
  //creamos el payload para poder conocer info del token
  const payload = { email: user.email }
// por medio del metodo signAsyn paso el payload y genera el token... retorno el token
  const token = await this.jwtService.signAsync(payload);

  return token;
  }

}
