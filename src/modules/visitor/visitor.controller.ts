import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateVisitorDto,
  UpdateVisitorDto,
} from 'src/shared/dto/entities/visitor.dto';
import { VisitorDocument } from 'src/schemas/visitor.schema';

@ApiTags('Visitors')
@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post()
  async create(@Body() dto: CreateVisitorDto): Promise<VisitorDocument> {
    return this.visitorService.create(dto);
  }

  @Get()
  async findAll(): Promise<VisitorDocument[]> {
    return this.visitorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VisitorDocument> {
    return this.visitorService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVisitorDto,
  ): Promise<VisitorDocument> {
    return this.visitorService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<VisitorDocument> {
    return this.visitorService.delete(id);
  }
}
