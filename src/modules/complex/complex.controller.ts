import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplexService } from './complex.service';
import { CreateComplexDto, UpdateComplexDto } from 'src/shared/dto/complex.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Complex')
@Controller('complex')
export class ComplexController {
  constructor(private readonly complex_service: ComplexService) {}

  @Post()
  create(@Body() dto: CreateComplexDto) {
    return this.complex_service.create(dto);
  }

  @Get()
  findAll() {
    return this.complex_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complex_service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateComplexDto) {
    return this.complex_service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complex_service.remove(id);
  }
}
