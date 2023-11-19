import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Person])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
