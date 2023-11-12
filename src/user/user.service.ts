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

  async create(createUserDto: CreateUserDto , id_role : number) : Promise<User> {
    const criteriaIdRole : FindOneOptions = { where : { id_role: id_role}}
    const role : Role = await this.roleRepository.findOne(criteriaIdRole)
    if(!role){
      throw new Error('no se encontro el rol que desea asignar al nuevo usuario');
    } else {
    const { email, user, password, status } = createUserDto;
    const newUser = new User( email, user, password, status );
    newUser.role = role;
    const savedUser = await this.userRepository.save(newUser)
    return savedUser;
    }
  }

  async findAll() : Promise<CreateUserDto[]>{
    return await this.userRepository.find();
  }

  async searchUsersByKeyword(keyword: string): Promise<User[]> {
    let filter = 'LOWER(user.email) LIKE :keyword OR LOWER(user.user) LIKE :keyword OR LOWER(person.name) LIKE :keyword OR LOWER(person.lastname) LIKE :keyword OR LOWER(person.dni) LIKE :keyword OR LOWER(role.description) LIKE :keyword';
    if (keyword === '') {
      return this.userRepository.find(); // Devuelve todos los usuarios si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.userRepository
      .createQueryBuilder('user') // select from blabla
      .leftJoin('user.person', 'person')
      .leftJoin('user.role', 'role')
      .where(filter, { keyword: `%${keyword}%` })
      .getMany();
  }

  async update(id: number, createUserDto: CreateUserDto, id_role : number) {
    const criteriaIdUser : FindOneOptions = { where : { id_user : id}};
    let user : User = await this.userRepository.findOne(criteriaIdUser);
    if (!user) {
      throw new Error('no se pudo encontrar el usuario a modificar');
    }
      const criteriaIdRole : FindOneOptions = { where : { id_role: id_role}}
      const role : Role = await this.roleRepository.findOne(criteriaIdRole)
      if(!role){
        throw new Error('no se encontro el rol que desea asignar al nuevo usuario');
      } else {
      user.setEmail(createUserDto.email);
      user.setPassword(createUserDto.password);
      user.setUser(createUserDto.user);
      user.setStatus(createUserDto.status);
      user.role = role;
      user = await this.userRepository.save(user);
      return ('se cambio el usuario')
    } 
  }

  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_user: id } };
    let user : User = await this.userRepository.findOne(criteria);
      if(user){
        await this.userRepository.remove(user);
        return true;
      } else throw new Error('no se encontro el usuario a eliminar');
  }
  async findAllUser(): Promise<any> {
    const result = await this.userRepository
      .createQueryBuilder('user')  // Cambié 'role' a 'user'
      .innerJoinAndSelect('user.role', 'role')  // Inner join con la relación 'role'
      .innerJoinAndSelect('user.person', 'person')  // Inner join con la relación 'person'
      .getMany();
    return result;
  }
}
