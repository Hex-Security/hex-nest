import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto, UpdateHouseDto } from 'src/shared/dto/house.dto';
import { HouseDocument } from 'src/shared/types/house.type';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel('House') private readonly houseModel: Model<HouseDocument>,
  ) {}

  async create(dto: CreateHouseDto): Promise<HouseDocument> {
    const createdHouse = new this.houseModel(dto);
    return createdHouse.save();
  }

  async findAll(): Promise<HouseDocument[]> {
    return this.houseModel.find().exec();
  }

  async findOne(id: string): Promise<HouseDocument> {
    return this.houseModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateHouseDto): Promise<HouseDocument> {
    return this.houseModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<HouseDocument> {
    return this.houseModel.findByIdAndDelete(id).exec();
  }
}
