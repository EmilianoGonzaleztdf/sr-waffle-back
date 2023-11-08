import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository : Repository<Person>
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

  async update(id: number, createPerson: CreatePersonDto) {
    const criteria : FindOneOptions = { where : { id_person : id}};
    let person : Person = await this.personRepository.findOne(criteria);
    if (!person) {
      throw new Error('no se pudo encontrar la persona a modificar');
    } else {
      person.setDni(createPerson.dni);
      person.setName(createPerson.name);
      person.setLastname(createPerson.lastname);
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

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const { dni, name, lastname } = createPersonDto;
    const newPerson = this.personRepository.create({ dni, name, lastname });
    const savedPerson = await this.personRepository.save(newPerson);
    return savedPerson;
  }
}
