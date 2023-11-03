import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() : Promise<CreateUserDto[]>{
    return await this.userRepository.find();
  }

  async public searchUsersByKeyword(keyword: string) : Promise<any[]> {
    if (!keyword) {
      return await this.userRepository.find(); // Devuelve todos los usuarios si el keyword está vacío
    }
  
    keyword = keyword.toLowerCase();
    let users = await this.userRepository.query('')

    const criterio : FindOneOptions = { where: {id_user:id_user}, relations:['person'] };
    return await this.userRepository.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.lastName.toLowerCase().includes(keyword) ||
        user.dni.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.user.toLowerCase().includes(keyword) ||
        user.rol.toLowerCase().includes(keyword),
    );

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
