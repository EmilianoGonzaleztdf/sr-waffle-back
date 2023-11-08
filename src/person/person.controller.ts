import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('/list')
  async findAll() : Promise<CreatePersonDto[]> {
    return this.personService.findAll();
  }
  
  @Get('search/:keyword')
  async searchProductsByKeyword(@Param('keyword') keyword : string) : Promise<CreatePersonDto[]>{
    if(keyword === ''){
      return this.personService.findAll();
    }
    return this.personService.searchPersonByKeyword(keyword);
  } ;

  @Patch('/update/:id')
  async update (@Body() person:Person, @Param('id') id : number) : Promise<String>{
    return await this.personService.update(id, person);
  }

  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.personService.remove(id);
  }
  @Post('/createPerson')
  async create(@Body() createPersonDto: CreatePersonDto) : Promise<Person> {
    return this.personService.create(createPersonDto);
  }
}
