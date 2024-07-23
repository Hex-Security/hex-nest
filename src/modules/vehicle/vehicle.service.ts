import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { UserService } from '../user/user.service';
import { CreateVehicleDto } from 'src/shared/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/shared/dto/vehicle/update-vehicle.dto';
import { QueryVehicleDto } from 'src/shared/dto/vehicle/query-vehicle.dto';
import { ComplexService } from '../complex/complex.service';
import { User } from 'src/schemas/user.schema';
import { VisitorService } from '../visitor/visitor.service';
import { Visitor } from 'src/schemas/visitor.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicle_model: Model<VehicleDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
    @Inject(forwardRef(() => ComplexService))
    private readonly complex_service: ComplexService,
    @Inject(forwardRef(() => VisitorService))
    private readonly visitor_service: VisitorService,
  ) {}

  async create(dto: CreateVehicleDto): Promise<VehicleDocument> {
    // 1. Find the owner in the user collection
    const owner = await this.user_service.findOne(dto.owner);

    // 2. Find the visitor owner in the visitor collection
    const owner_visitor = await this.user_service.findOne(dto.owner_visitor);

    // 2. Find the complex in the complex collection
    const complex = await this.complex_service.findOne(dto.complex);

    // 3. Generate new ObjectId
    const _id = new mongoose.Types.ObjectId();

    // 4. Create the vehicle
    const vehicle = await new this.vehicle_model({
      _id,
      ...dto,
      owner,
      owner_visitor,
      complex,
    }).save();

    // 5. Add the vehicle to the owner's vehicle list
    await this.user_service.addVehicle(dto.owner, _id.toString());

    // 6. Add the vehicle to the complex's vehicle list
    await this.complex_service.addVehicle(dto.complex, _id.toString());

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
    const vechicle = await this.vehicle_model.findById(id).exec();

    if (!vechicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return vechicle;
  }

  async update(id: string, dto: UpdateVehicleDto): Promise<VehicleDocument> {
    return this.vehicle_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<VehicleDocument> {
    return this.vehicle_model.findByIdAndDelete(id).exec();
  }

  async findOwner(id: string): Promise<User> {
    const vehicle = await this.findOne(id);
    return this.user_service.findOne(vehicle.owner._id.toString());
  }

  async setOwner(id: string, owner_id: string): Promise<VehicleDocument> {
    // 1. Find the vehicle
    const vehicle = await this.findOne(id);

    // 2. Find the new owner
    const owner = await this.user_service.findOne(owner_id);

    // 3. Update the vehicle's owner
    vehicle.owner = owner;

    // 4. Save the changes
    return vehicle.save();
  }

  async removeOwner(id: string): Promise<VehicleDocument> {
    // 1. Find the vehicle
    const vehicle = await this.findOne(id);

    // 2. Update the vehicle's owner
    vehicle.owner = null;

    // 3. Save the changes
    return vehicle.save();
  }

  async findOwnerVisitor(id: string): Promise<Visitor> {
    const vehicle = await this.vehicle_model
      .findById(id)
      .populate('owner_visitor')
      .exec();

    return vehicle.owner_visitor;
  }

  async setOwnerVisitor(
    id: string,
    owner_visitor_id: string,
  ): Promise<VehicleDocument> {
    // 1. Find the vehicle
    const vehicle = await this.findOne(id);

    // 2. Find the new owner visitor
    const owner_visitor = await this.visitor_service.findOne(owner_visitor_id);

    // 3. Update the vehicle's owner visitor
    vehicle.owner_visitor = owner_visitor;

    // 4. Save the changes
    return vehicle.save();
  }

  async removeOwnerVisitor(id: string): Promise<VehicleDocument> {
    // 1. Find the vehicle
    const vehicle = await this.findOne(id);

    // 2. Update the vehicle's owner visitor
    vehicle.owner_visitor = null;

    // 3. Save the changes
    return vehicle.save();
  }
}
