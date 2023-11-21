import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports : [ JwtModule.register({
    global : true,
    secret : "LA PALABRA SECRETA O EL SCRETO ES UNA PALABRA SECRETAMENTE SECRETA, Y UN BREACK",
    signOptions : {expiresIn : "1d"}
  }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}