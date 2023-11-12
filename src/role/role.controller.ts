import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/list')
  async findAll() : Promise<CreateRoleDto[]> {
    return this.roleService.findAll();
  }
  @Get('search/:keyword')
  async searchProductsByKeyword(@Param('keyword') keyword : string) : Promise<CreateRoleDto[]>{
    if(keyword === ''){
      return this.roleService.findAll();
    }
    return this.roleService.searchRoleByKeyword(keyword);
  } ;

  @Patch('/update/:id')
  async update (@Body() role:Role, @Param('id') id : number) : Promise<String>{
    return await this.roleService.update(id, role);
  }

  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.roleService.remove(id);
  }
  @Post('/createRole')
  async create(@Body() createProductDto: CreateRoleDto) : Promise<Role> {
    return this.roleService.create(createProductDto);
  }
}