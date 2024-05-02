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

  // GET /complex
  @Get()
  async findAll(): Promise<Complex[]> {
    const complexes: Complex[] = await this.complex_service.findAll();

    if (!complexes.length) {
      throw new NotFoundException('No complexes found');
    }

    return complexes;
  }

  // POST /complex
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComplex(@Body() dto: ComplexDto): Promise<Complex> {
    try {
      const complex: Complex = await this.complex_service.create(dto);
      return complex;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // GET /complex/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Complex> {
    const complex: Complex = await this.complex_service.findOne(id);

    if (!complex) {
      throw new NotFoundException(`Complex with id ${id} not found`);
    }

    return complex;
  }

  // PUT /complex/:id
  @Put(':id')
  async updateComplex(
    @Param('id') id: string,
    @Body() dto: ComplexDto,
  ): Promise<Complex> {
    return this.complex_service.update(id, dto);
  }

  // DELETE /complex/:id
  @Delete(':id')
  async deleteComplex(@Param('id') id: string): Promise<Complex> {
    try {
      return await this.complex_service.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
