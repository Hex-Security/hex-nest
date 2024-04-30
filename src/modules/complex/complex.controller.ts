import {
  BadRequestException,
  Body,
  Controller,
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
  constructor(private complexService: ComplexService) {}
  // generate endpoints for the CRUD operations
  // GET /complex
  @Get()
  async findAll(): Promise<Complex[]> {
    const complexes: Complex[] = await this.complexService.findAll();

    if (!complexes.length) {
      throw new NotFoundException('No complexes found');
    }

    return complexes;
  }

  // POST /complex
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComplex(@Body() dto: ComplexDto): Complex {
    try {
      const complex: Complex = await this.complexService.create(dto);
      return complex;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // GET /complex/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Complex> {
    const complex: Complex = await this.complexService.findOne(id);

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
  ): Promise<UpdateResult> {
    const result: UpdateResult = await this.complexService.update(id, dto);
    
    if()
  }

  // DELETE /complex/:id
  @Delete(':id')
  async deleteComplex(@Param('id') id: string): Promise<void> {
    try {
      await this.complexService.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
