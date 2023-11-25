import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository : Repository<Person>,
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){};

  async findAll(): Promise<CreatePersonDto[]> {
    return await this.personRepository.find();
  }

  async searchPersonByKeyword(keyword: string): Promise<Person[]> {
    if (keyword === '') {
      return this.personRepository.find(); // Devuelve todos las personas si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.personRepository
      .createQueryBuilder('person')
      .where('LOWER(person.name) LIKE :keyword OR LOWER(person.lastname) LIKE :keyword OR LOWER(person.dni) LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  async update(id: number, createPerson: CreatePersonDto, id_user : number) {
    const criteriaIdPerson : FindOneOptions = { where : { id_person : id}};
    let person : Person = await this.personRepository.findOne(criteriaIdPerson);
    if (!person) {
      throw new Error('no se pudo encontrar la persona a modificar'); 
    } 
    const criteriaIdUser : FindOneOptions = { where : { id_user: id_user}}
      const user : User = await this.userRepository.findOne(criteriaIdUser)
      if(!user){
        throw new Error('no se encontro el usuario que desea asignar a la persona');
      } else {
      person.setDni(createPerson.dni);
      person.setName(createPerson.name);
      person.setLastname(createPerson.lastname);
      person.user = user;
      person = await this.personRepository.save(person);
      return ('se cambio la persona')
    }
  }

  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_person: id } };
    let person : Person = await this.personRepository.findOne(criteria);
      if(person){
        await this.personRepository.remove(person);
        return true;
      } else throw new Error('no se encontro la persona a eliminar');
  }

  async create(createPersonDto: CreatePersonDto, id_user : number): Promise<Person> {
    const criteriaIdUser : FindOneOptions = { where : { id_user: id_user}}
    const user : User = await this.userRepository.findOne(criteriaIdUser)
    if(!user){
      throw new Error('no se encontro el usuario al que desea asignar la persona');
    } else {
    const { dni, name, lastname } = createPersonDto;
    const newPerson = new Person(dni, name, lastname);
    newPerson.user = user;
    const savedPerson = await this.personRepository.save(newPerson);
    return savedPerson;
    }
  }
  async findAllPersonsWithRelations(): Promise<Person[]> {
    const persons = await this.personRepository.find({
      relations: ['user',],
    });
    return persons;
  }
}
