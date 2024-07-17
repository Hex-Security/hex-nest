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

@Injectable()
export class ComplexService {
  constructor(
    @InjectModel(Complex.name)
    private readonly complex_model: Model<ComplexDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
  ) {}

  async create(dto: CreateComplexDto): Promise<ComplexDocument> {
    const createdComplex = new this.complex_model({
      _id: new mongoose.Types.ObjectId(),
      ...dto,
      houses: dto.house_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      admins: dto.admin_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      guards: dto.guard_ids.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      residents: dto.resident_ids.map(
        (id) => new mongoose.Schema.Types.ObjectId(id),
      ),
    });
    return createdComplex.save();
  }

  async findAll(): Promise<ComplexDocument[]> {
    return this.complex_model.find().exec();
  }

  async findOne(id: string): Promise<ComplexDocument> {
    const complex = await this.complex_model.findById(id).exec();

    if (!complex) {
      throw new NotFoundException(`Complex with ID ${id} not found`);
    }

    return complex;
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

  async addHouse(_id: string, house: House): Promise<ComplexDocument> {
    // 1. Find the complex
    const complex = await this.findOne(_id);

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
}
