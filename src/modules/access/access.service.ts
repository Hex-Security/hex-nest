import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAccessDto,
  UpdateAccessDto,
} from 'src/shared/dto/entities/access.dto';
import { AccessDocument } from 'src/shared/types/access.type';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Access')
    private readonly accessModel: Model<AccessDocument>,
  ) {}

  async create(dto: CreateAccessDto): Promise<AccessDocument> {
    const createdAccess = new this.accessModel(dto);
    return createdAccess.save();
  }

  async findAll(): Promise<AccessDocument[]> {
    return this.accessModel.find().exec();
  }

  async findOne(id: string): Promise<AccessDocument> {
    return this.accessModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateAccessDto): Promise<AccessDocument> {
    return this.accessModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<AccessDocument> {
    return this.accessModel.findByIdAndDelete(id).exec();
  }
}
