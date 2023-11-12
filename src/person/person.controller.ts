import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
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

  @Patch('/update/:id/:user')
  async update (@Body() person:Person, @Param('id') id : number, @Param('user') user : number) : Promise<String>{
    return await this.personService.update(id, person, user);
  }

  @Delete('/delete/:id')
  async remove (@Param('id') id : number) : Promise<boolean>{
    return this.personService.remove(id);
  }
  @Post('/createPerson/:id')
  async create(@Body() createPersonDto: CreatePersonDto, @Param('id') id : number) : Promise<Person> {
    return this.personService.create(createPersonDto, id);
  }
}
