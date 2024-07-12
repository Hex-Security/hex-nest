import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAccessDto,
  UpdateAccessDto,
} from 'src/shared/dto/entities/access.dto';
import { AccessDocument } from 'src/shared/types/access.type';
import { Access } from '../entity/entities/access.entity';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Access')
    private readonly access_model: Model<AccessDocument>,
  ) {}

  async create(dto: CreateAccessDto): Promise<AccessDocument> {
    const createdAccess = new this.access_model(dto);
    return createdAccess.save();
  }

  async findAll(): Promise<AccessDocument[]> {
    return this.access_model.find().exec();
  }

  async findOne(id: string): Promise<AccessDocument> {
    return this.access_model.findById(id).exec();
  }

  async update(id: string, dto: UpdateAccessDto): Promise<AccessDocument> {
    return this.access_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<AccessDocument> {
    return this.access_model.findByIdAndDelete(id).exec();
  }

  async approve(id: string): Promise<AccessDocument> {
    return this.access_model
      .findByIdAndUpdate(id, { status: 'approved' }, { new: true })
      .exec();
  }

  async deny(id: string): Promise<AccessDocument> {
    return this.access_model
      .findByIdAndUpdate(id, { status: 'denied' }, { new: true })
      .exec();
  }

  async cancel(id: string): Promise<AccessDocument> {
    return this.access_model
      .findByIdAndUpdate(id, { status: 'cancelled' }, { new: true })
      .exec();
  }

  async complete(id: string): Promise<AccessDocument> {
    return this.access_model
      .findByIdAndUpdate(id, { status: 'completed' }, { new: true })
      .exec();
  }
}
