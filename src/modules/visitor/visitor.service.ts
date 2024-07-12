import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createVisitorDto, UpdateVisitorDto } from 'src/shared/dto/visitor.dto';
import { VisitorDocument } from 'src/shared/types/visitor.type';

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel('Visitor')
    private readonly visitor_model: Model<VisitorDocument>,
  ) {}

  async create(dto: createVisitorDto): Promise<VisitorDocument> {
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
