import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ComplexService } from './complex.service';
import { Complex } from '../entity/entities/complex.entity';
import { UpdateResult } from 'typeorm';
import { ComplexDto } from 'src/shared/dto/complex.dto';

@Controller('complex')
export class ComplexController {
  constructor(private complex_service: ComplexService) {}

  @Get()
  async findAll(): Promise<Complex[]> {
    const complexes: Complex[] = await this.complex_service.findAll();

    if (!complexes.length) {
      throw new NotFoundException('No complexes were found.');
    }

    return complexes;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComplex(@Body() dto: ComplexDto): Promise<Complex> {
    return this.complex_service.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Complex> {
    const complex: Complex = await this.complex_service.findOne(id);

    if (!complex) {
      throw new NotFoundException(`Complex with id ${id} not found`);
    }

    return complex;
  }

  @Put(':id')
  async updateComplex(
    @Param('id') id: string,
    @Body() dto: ComplexDto,
  ): Promise<Complex> {
    return this.complex_service.update(id, dto);
  }

  // q: if i remove the try catch clause will this work the same?
  // a:
  @Delete(':id')
  async deleteComplex(@Param('id') id: string): Promise<Complex> {
    return this.complex_service.remove(id);
  }
}
