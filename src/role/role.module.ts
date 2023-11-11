import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Person, User])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
