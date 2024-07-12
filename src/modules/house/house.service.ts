import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House, HouseDocument } from 'src/schemas/house.schema';
import {
  CreateHouseDto,
  UpdateHouseDto,
} from 'src/shared/dto/entities/house.dto';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name)
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
