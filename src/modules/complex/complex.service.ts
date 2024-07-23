import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complex, ComplexDocument } from 'src/schemas/complex.schema';
import { House } from 'src/schemas/house.schema';
import { CreateComplexDto } from 'src/shared/dto/complex/create-complex.dto';
import { UpdateComplexDto } from 'src/shared/dto/complex/update-complex.dto';
import mongoose from 'mongoose';
import { UserService } from '../user/user.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import { HouseService } from '../house/house.service';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { Vehicle } from 'src/schemas/vehicle.schema';
import { VehicleService } from '../vehicle/vehicle.service';
import { Visitor } from 'src/schemas/visitor.schema';

@Injectable()
export class ComplexService {
  constructor(
    @InjectModel(Complex.name)
    private readonly complex_model: Model<ComplexDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
    @Inject(forwardRef(() => HouseService))
    private readonly house_service: HouseService,
    @Inject(forwardRef(() => VehicleService))
    private readonly vehicle_service: VehicleService,
  ) {}

  async create(dto: CreateComplexDto): Promise<ComplexDocument> {
    const createdComplex = new this.complex_model({
      _id: new mongoose.Types.ObjectId(),
      ...dto,
      houses: dto.house_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      admins: dto.admin_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      guards: dto.guard_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      vehicles: dto.vehicle_ids.map(
        (id) => new mongoose.Schema.Types.ObjectId(id),
      ),
      residents: dto.resident_ids.map(
        (id) => new mongoose.Schema.Types.ObjectId(id),
      ),
    });
    return createdComplex.save();
  }

  async findAll(): Promise<ComplexDocument[]> {
    return this.complex_model.find().exec();
  }

  async findAllManaged(user_id: string) {
    // 1. Find the user
    const user = await this.user_service.findOne(user_id);

    // 2. Get the ids of the complexes the user manages or is part of
    const complex_ids =
      user.role === RolesEnum.ADMIN
        ? user.data.admin.complexes.map((c) => c._id)
        : user.role === RolesEnum.GUARD
          ? user.data.guard.complexes.map((c) => c._id)
          : user.role === RolesEnum.USER
            ? user.data.user.houses.map((h) => h.complex._id)
            : [];

    // 3. Find the complexes
    return this.complex_model.find({ _id: { $in: complex_ids } }).exec();
  }

  async findOne(id: string): Promise<ComplexDocument> {
    const complex = await this.complex_model.findById(id).exec();

    if (!complex) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }

    return complex;
  }

  async findHouses(id: string): Promise<House[]> {
    const complex = await this.complex_model
      .findById(id)
      .populate('houses')
      .exec();

    return complex.houses;
  }

  async update(id: string, dto: UpdateComplexDto): Promise<ComplexDocument> {
    const updatedComplex = await this.complex_model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updatedComplex) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }

    return updatedComplex;
  }

  async remove(id: string): Promise<void> {
    const result = await this.complex_model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }
  }

  async addGuard(_id: string, guard_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Find the guard
    const guard = await this.user_service.findOne(guard_id);

    // 3. Check if the guard is already in the complex
    if (complex.guards.some((g) => g._id === guard._id)) {
      return complex;
    }

    // 4. Add the guard to the complex
    complex.guards.push(guard);

    // 5. Save the complex
    return complex.save();
  }

  async removeGuard(_id: string, guard_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the guard from the complex
    complex.guards = complex.guards.filter(
      (g) => g._id.toString() !== guard_id,
    );

    // 3. Remove the complex from the guard
    const guard = await this.user_service.findOne(guard_id);

    guard.data.guard.complexes = guard.data.guard.complexes.filter(
      (c) => c._id.toString() !== complex._id.toString(),
    );

    // 4. Save the guard
    await guard.save();

    // 3. Save the complex
    return complex.save();
  }

  async addAdmin(_id: string, admin_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Find the admin
    const admin = await this.user_service.findOne(admin_id);

    // 2. Check if the admin is already in the complex
    if (complex.admins.some((a) => a._id === admin._id)) {
      return complex;
    }

    // 3. Add the admin to the complex
    complex.admins.push(admin);

    // 4. Save the complex
    return complex.save();
  }

  async removeAdmin(_id: string, admin_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the admin from the complex
    complex.admins = complex.admins.filter(
      (a) => a._id.toString() !== admin_id,
    );

    // 3. Save the complex
    return complex.save();
  }

  async addResident(
    _id: string,
    resident_id: string,
  ): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Find the resident
    const resident = await this.user_service.findOne(resident_id);

    // 2. Check if the resident is already in the complex
    if (complex.residents.some((r) => r._id === resident._id)) {
      return complex;
    }

    // 3. Add the resident to the complex
    complex.residents.push(resident);

    // 4. Save the complex
    return complex.save();
  }

  async removeResident(
    _id: string,
    resident_id: string,
  ): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the resident from the complex
    complex.residents = complex.residents.filter(
      (r) => r._id.toString() !== resident_id,
    );

    // 3. Save the complex
    return complex.save();
  }

  async addHouse(_id: string, house_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Obtain House
    const house = await this.house_service.findOne(house_id);

    // 2. Check if the house is already in the complex
    if (complex.houses.some((h) => h._id === house._id)) {
      return complex;
    }

    // 3. Add the house to the complex
    complex.houses.push(house);

    // 4. Save the complex
    return complex.save();
  }

  async removeHouse(_id: string, house_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the house from the complex
    complex.houses = complex.houses.filter(
      (h) => h._id.toString() !== house_id,
    );

    // 3. Save the complex
    return complex.save();
  }

  async addVehicle(_id: string, vehicle_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Find the vehicle
    const vehicle = await this.vehicle_service.findOne(vehicle_id);

    // 3. Check if the vehicle is already in the complex
    if (complex.vehicles.some((v) => v._id === vehicle._id)) {
      return complex;
    }

    // 4. Add the vehicle to the complex
    complex.vehicles.push(vehicle);

    // 5. Save the complex
    return complex.save();
  }

  async removeVehicle(
    _id: string,
    vehicle_id: string,
  ): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the vehicle from the complex
    complex.vehicles = complex.vehicles.filter(
      (v) => v._id.toString() !== vehicle_id,
    );

    // 3. Save the complex
    return complex.save();
  }

  async findGuards(_id: string): Promise<User[]> {
    const complex = await this.complex_model
      .findById(_id)
      .populate('guards')
      .exec();

    return complex.guards;
  }

  async findAdmins(_id: string): Promise<User[]> {
    const complex = await this.complex_model
      .findById(_id)
      .populate('admins')
      .exec();

    return complex.admins;
  }

  async findVehicles(_id: string): Promise<Vehicle[]> {
    const complex = await this.complex_model
      .findById(_id)
      .populate('vehicles')
      .exec();

    return complex.vehicles;
  }

  async findVisitors(_id: string): Promise<Visitor[]> {
    const complex = await this.complex_model
      .findById(_id)
      .populate('visitors')
      .exec();

    return complex.visitors;
  }

  async findResidents(_id: string): Promise<User[]> {
    const complex = await this.complex_model
      .findById(_id)
      .populate('residents')
      .exec();

    return complex.residents;
  }

  async addVisitor(_id: string, visitor_id: string): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Find the visitor
    const visitor = await this.user_service.findOne(visitor_id);

    // 3. Check if the visitor is already in the complex
    if (complex.visitors.some((v) => v._id === visitor._id)) {
      return complex;
    }

    // 4. Add the visitor to the complex
    complex.visitors.push(visitor.toObject());

    // 5. Save the complex
    return complex.save();
  }

  async removeVisitor(
    _id: string,
    visitor_id: string,
  ): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

    // 2. Remove the visitor from the complex
    complex.visitors = complex.visitors.filter(
      (v) => v._id.toString() !== visitor_id,
    );

    // 3. Save the complex
    return complex.save();
  }
}
