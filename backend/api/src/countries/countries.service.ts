import { Country } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resp } from '../utils';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>
  ) {}

  public async findAll() {
    const countries = await this.countryRepository.find();

    if (countries.length === 0) {
      return Resp.Error('FOUND', 'No countries found');
    }

    return Resp.Success(countries, 'OK');
  }
}
