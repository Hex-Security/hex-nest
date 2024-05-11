import {
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
import { ComplexDto } from 'src/shared/dto/complex.dto';
import { Complex } from '../entity/entities/complex.entity';
import { User } from '../entity/entities/user.entity';
import { ComplexService } from './complex.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('complex')
export class ComplexController {
  constructor(private complex_service: ComplexService) {}

  @Get()
  async findAll(): Promise<Complex[]> {
    const complexes: Complex[] = await this.complex_service.findAll();

    if (complexes.length === 0) {
      throw new NotFoundException('No complexes were found.');
    }

    return complexes;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComplex(@Body() dto: ComplexDto): Promise<Complex> {
    return this.complex_service.create(dto);
  }

  @Get(':complex_id')
  async findOne(@Param('complex_id') complex_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_service.findOne(complex_id);

    if (!complex) {
      throw new NotFoundException(
        `Complex with complex_id ${complex_id} not found`,
      );
    }

    return complex;
  }

  @Put(':complex_id')
  async updateComplex(
    @Param('complex_id') complex_id: string,
    @Body() dto: ComplexDto,
  ): Promise<Complex> {
    return this.complex_service.update(complex_id, dto);
  }

  @Delete(':complex_id')
  async deleteComplex(
    @Param('complex_id') complex_id: string,
  ): Promise<Complex> {
    return this.complex_service.remove(complex_id);
  }

  @Put(':complex_id/admin')
  async updateAdmin(
    @Param('complex_id') complex_id: string,
    @Body() dto: UpdateAdminDto,
  ): Promise<Complex> {
    return this.complex_service.setAdmin(complex_id, dto.admin);
  }

  @Get(':complex_id/admin')
  async getAdmin(@Param('complex_id') complex_id: string): Promise<User> {
    return this.complex_service.getAdmin(complex_id);
  }

  @Delete(':complex_id/admin')
  async deleteAdmin(@Param('complex_id') complex_id: string): Promise<Complex> {
    return this.complex_service.removeAdmin(complex_id);
  }

  @Get(':complex_id/metadata')
  async getMetadata(@Param('complex_id') complex_id: string): Promise<any> {
    return this.complex_service.getMetadata(complex_id);
  }

  @Put(':complex_id/metadata')
  async updateMetadata(
    @Param('complex_id') complex_id: string,
    @Body() metadata: any,
  ): Promise<Complex> {
    return this.complex_service.setMetadata(complex_id, metadata);
  }

  @Delete(':complex_id/metadata')
  async deleteMetadata(
    @Param('complex_id') complex_id: string,
  ): Promise<Complex> {
    return this.complex_service.removeMetadata(complex_id);
  }
}
