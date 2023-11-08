import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository : Repository<Role>
  ){};

  async findAll(): Promise<CreateRoleDto[]> {
    return await this.roleRepository.find();
  }

  async searchRoleByKeyword(keyword: string): Promise<Role[]> {
    if (keyword === '') {
      return this.roleRepository.find(); // Devuelve todos los roles si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.roleRepository
      .createQueryBuilder('role')
      .where('LOWER(role.description) LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  async update(id: number, createRole: CreateRoleDto) {
    const criteria : FindOneOptions = { where : { id_role : id}};
    let role : Role = await this.roleRepository.findOne(criteria);
    if (!role) {
      throw new Error('no se pudo encontrar el rol a modificar');
    } else {
      role.setDescription(createRole.description);
      role = await this.roleRepository.save(role);
      return ('se cambio el rol')
    }
  }

  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_role: id } };
    let role : Role = await this.roleRepository.findOne(criteria);
      if(role){
        await this.roleRepository.remove(role);
        return true;
      } else throw new Error('no se encontro el rol a eliminar');
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { description } = createRoleDto;
    const newRole = this.roleRepository.create({ description });
    const savedRole = await this.roleRepository.save(newRole);
    return savedRole;
  }
}
