import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateHouseDto,
  UpdateHouseDto,
} from 'src/shared/dto/entities/house.dto';
import { HouseDocument } from 'src/shared/types/house.type';
import { House } from '../entity/entities/house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.modelName)
    private readonly house_model: Model<HouseDocument>,
  ) {}

  async create(dto: CreateHouseDto): Promise<HouseDocument> {
    const createdHouse = new this.house_model(dto);
    return createdHouse.save();
  }

  async findAll(): Promise<HouseDocument[]> {
    return this.house_model.find().exec();
  }

  async findOne(id: string): Promise<HouseDocument> {
    return this.house_model.findById(id).exec();
  }

  async update(id: string, dto: UpdateHouseDto): Promise<HouseDocument> {
    return this.house_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<HouseDocument> {
    return this.house_model.findByIdAndDelete(id).exec();
  }
}
