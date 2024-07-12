import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateVisitorDto,
  UpdateVisitorDto,
} from 'src/shared/dto/entities/visitor.dto';
import { VisitorDocument } from 'src/shared/types/visitor.type';
import { Visitor } from '../entity/entities/visitor.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.modelName)
    private readonly visitor_model: Model<VisitorDocument>,
  ) {}

  async create(dto: CreateVisitorDto): Promise<VisitorDocument> {
    const createdVisitor = new this.visitor_model(dto);
    return createdVisitor.save();
  }

  async findAll(): Promise<VisitorDocument[]> {
    return this.visitor_model.find().exec();
  }

  async findOne(id: string): Promise<VisitorDocument> {
    return this.visitor_model.findById(id).exec();
  }

  async update(id: string, dto: UpdateVisitorDto): Promise<VisitorDocument> {
    return this.visitor_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<VisitorDocument> {
    return this.visitor_model.findByIdAndDelete(id).exec();
  }
}
