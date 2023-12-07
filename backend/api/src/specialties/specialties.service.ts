import { Specialty } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resp } from '../utils';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private specialtiesRepository: Repository<Specialty>
  ) {}

  public async findAll() {
    const specialties = await this.specialtiesRepository.find();

    if (specialties.length === 0) {
      return Resp.Error('FOUND', 'No specialties found');
    }

    return Resp.Success(specialties, 'OK');
  }
}
