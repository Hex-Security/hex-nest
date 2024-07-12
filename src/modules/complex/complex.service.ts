import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complex } from '../entity/entities/complex.entity';
import { ComplexDocument } from 'src/shared/types/complex.type';
import { CreateComplexDto, UpdateComplexDto } from 'src/shared/dto/complex.dto';

@Injectable()
export class ComplexService {
  constructor(
    @InjectModel(Complex.name)
    private readonly complex_model: Model<ComplexDocument>,
  ) {}

  async create(dto: CreateComplexDto): Promise<ComplexDocument> {
    const createdComplex = new this.complex_model(dto);
    return createdComplex.save();
  }

  async findAll(): Promise<ComplexDocument[]> {
    return this.complex_model.find().exec();
  }

  async findOne(id: string): Promise<ComplexDocument> {
    const complex = await this.complex_model.findById(id).exec();

    if (!complex) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }

    return complex;
  }

  async update(id: string, dto: UpdateComplexDto): Promise<ComplexDocument> {
    const updatedComplex = await this.complex_model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updatedComplex) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }

    return updatedComplex;
  }

  async remove(id: string): Promise<void> {
    const result = await this.complex_model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }
  }
}
