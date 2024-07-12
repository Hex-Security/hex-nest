import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from 'src/shared/dto/entities/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicle_model: Model<VehicleDocument>,
  ) {}

  async create(dto: CreateVehicleDto): Promise<VehicleDocument> {
    const createdVehicle = new this.vehicle_model(dto);
    return createdVehicle.save();
  }

  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicle_model.find().exec();
  }

  async findOne(id: string): Promise<VehicleDocument> {
    return this.vehicle_model.findById(id).exec();
  }

  async update(id: string, dto: UpdateVehicleDto): Promise<VehicleDocument> {
    return this.vehicle_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<VehicleDocument> {
    return this.vehicle_model.findByIdAndDelete(id).exec();
  }
}
