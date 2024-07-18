import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { UserService } from '../user/user.service';
import { CreateVehicleDto } from 'src/shared/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/shared/dto/vehicle/update-vehicle.dto';
import { QueryVehicleDto } from 'src/shared/dto/vehicle/query-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicle_model: Model<VehicleDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
  ) {}

  async create(dto: CreateVehicleDto): Promise<VehicleDocument> {
    // 1. Find the owner in the user collection
    const owner = await this.user_service.findOne(dto.owner);

    // 2. Generate new ObjectId
    const _id = new mongoose.Types.ObjectId();

    // 3. Create the vehicle
    const vehicle = await new this.vehicle_model({
      _id,
      ...dto,
      owner,
    }).save();

    // 3. Add the vehicle to the owner's vehicle list
    await this.user_service.addVehicle(dto.owner, _id.toString());

    return vehicle;
  }

  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicle_model.find().exec();
  }

  async query(dto: QueryVehicleDto): Promise<VehicleDocument[]> {
    const query = {};

    if (dto.owner) {
      query['owner'] = dto.owner;
    }
    if (dto.plate) {
      query['plate'] = dto.plate;
    }
    if (dto.make) {
      query['make'] = dto.make;
    }
    if (dto.model) {
      query['model'] = dto.model;
    }
    if (dto.year) {
      query['year'] = dto.year;
    }
    if (dto.color) {
      query['color'] = dto.color;
    }

    return this.vehicle_model.find(query).exec();
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
