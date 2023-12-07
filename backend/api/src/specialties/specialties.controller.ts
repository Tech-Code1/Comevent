import { Controller, Get } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Get()
  public async findAllSpecialties() {
    return await this.specialtiesService.findAll();
  }
}
