import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ){}
  async findAll() : Promise<CreateStatusDto[]> {
    return await this.statusRepository.find();
  }
  async searchProductsByKeyword(keyword: string): Promise<Status[]> {
    let filter = 'LOWER(status.description) LIKE :keyword';
    if (keyword === '') {
      return this.statusRepository.find(); // Devuelve todos los productos si la keyword está vacía
    }
    keyword = keyword.toLowerCase();
    return this.statusRepository
      .createQueryBuilder('status')
      .where(filter, { keyword: `%${keyword}%` })
      .getMany();
  }
  async update(id: number, createStatus: CreateStatusDto) {
    const criteria : FindOneOptions = { where : { id_status : id}};
    let status : Status = await this.statusRepository.findOne(criteria);
    if (!status) {
      throw new Error('no se pudo encontrar status a modificar');
    } else {
      status.setDescription(createStatus.description);
      status = await this.statusRepository.save(status);
      return ('se cambio la descripcion del status');
    }
  }
  async remove(id: number) {
    const criteria: FindOneOptions = { where: { id_status: id } };
    let status : Status = await this.statusRepository.findOne(criteria);
      if(status){
        await this.statusRepository.remove(status);
        return true;
      } else throw new Error('no se encontro el status a eliminar');
  }
  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const {description} = createStatusDto;
    const newStatus = this.statusRepository.create({ description });
    const savedStatus = await this.statusRepository.save(newStatus);
    return savedStatus;
  }
}