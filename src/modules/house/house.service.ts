import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { House, HouseDocument } from 'src/schemas/house.schema';
import { ComplexService } from '../complex/complex.service';
import { CreateHouseDto } from 'src/shared/dto/house/create-house.dto';
import { UpdateHouseDto } from 'src/shared/dto/house/update-house.dto';
import { UserService } from '../user/user.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Vehicle } from 'src/schemas/vehicle.schema';
import { Visitor } from 'src/schemas/visitor.schema';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name)
    private readonly house_model: Model<HouseDocument>,
    @Inject(forwardRef(() => ComplexService))
    private readonly complex_service: ComplexService,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
  ) {}

  async create(
    complex_id: string,
    dto: CreateHouseDto,
  ): Promise<HouseDocument> {
    // 1. Get the complex by id
    const complex = await this.complex_service.findOne(complex_id);

    // 2. Check if the complex exists
    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found`);
    }

    // 3. Generate new ObjectId
    const _id = new mongoose.Types.ObjectId();

    // 4. Create the house
    const created_house = new this.house_model({
      _id,
      ...dto,
      owner: await this.user_service.findOne(dto.owner),
      complex,
    }).save();

    // 5. Update complex entity
    await this.complex_service.addHouse(complex_id, _id.toString());

    // 6. Update user owner entity
    await this.user_service.addHouse(dto.owner, _id.toString());

    return created_house;
  }

  async findAll(): Promise<HouseDocument[]> {
    return this.house_model.find().exec();
  }

  async findAllByComplex(complex_id: string): Promise<HouseDocument[]> {
    return this.house_model.find({ complex: complex_id }).exec();
  }

  async findOne(id: string): Promise<HouseDocument> {
    const house = await this.house_model.findById(id).exec();

    if (!house) {
      throw new NotFoundException(`House with ID ${id} not found`);
    }

    return house;
  }

  async findMany(ids: string[]): Promise<HouseDocument[]> {
    return this.house_model.find({ _id: { $in: ids } }).exec();
  }

  async update(id: string, dto: UpdateHouseDto): Promise<HouseDocument> {
    return this.house_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    // 1. Find the house
    const house = await this.findOne(id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${id} not found`);
    }

    // 3. Delete the house
    // 3.1 Remove the house from the complex entity
    await this.complex_service.removeHouse(house.complex._id.toString(), id);

    // 3.2 Remove the house from the owner entity
    await this.user_service.removeHouse(house.owner._id.toString(), id);

    // 3.3 Remove the house from the residents entity
    for (const resident of house.residents) {
      await this.user_service.removeResidentHouse(resident._id.toString(), id);
    }

    await this.house_model
      .deleteOne(
        { id },
        {
          new: true,
        },
      )
      .exec();

    return;
  }

  async activate(id: string): Promise<HouseDocument> {
    return this.update(id, { active: true });
  }

  async deactivate(id: string): Promise<HouseDocument> {
    return this.update(id, { active: false });
  }

  async getOwner(id: string): Promise<User> {
    const house = await this.house_model.findById(id).populate('owner').exec();
    return house.owner;
  }

  async setOwner(_id: string, owner_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Update the house entity
    house.owner = await this.user_service.findOne(owner_id);

    return house.save();
  }

  async removeOwner(_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Update the house entity
    house.owner = null;

    // 4. Update the user owner entity
    await this.user_service.removeHouse(house.owner._id.toString(), _id);

    return house.save();
  }

  async findResidents(_id: string): Promise<User[]> {
    const house = await this.house_model
      .findById(_id)
      .populate('residents')
      .exec();
    return house.residents;
  }

  async addResident(
    _id: string,
    resident_ids: string[],
  ): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Get the user resident
    const residents: UserDocument[] =
      await this.user_service.findMany(resident_ids);

    // 4. Filter the residents that are already in the house
    const new_residents = residents
      .filter(
        (resident) =>
          !house.residents.some(
            (resident_house) =>
              resident_house._id.toString() === resident._id.toString(),
          ),
      )
      .map((resident) => resident as User);

    // 5. Update the house entity
    house.residents.push(...new_residents);

    return house.save();
  }

  async removeResident(
    _id: string,
    resident_id: string,
  ): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Remove the resident from the house
    house.residents = house.residents.filter(
      (resident) => resident._id.toString() !== resident_id.toString(),
    );

    return house.save();
  }

  async findVehicles(_id: string): Promise<Vehicle[]> {
    const house = await this.house_model
      .findById(_id)
      .populate('vehicles')
      .exec();
    return house.vehicles;
  }

  async addVehicle(_id: string, vehicle_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Get the vehicle
    const vehicle = await this.user_service.findOne(vehicle_id);

    // 4. Check if the vehicle exists
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${vehicle_id} not found`);
    }

    // 5. Update the house entity
    house.vehicles.push(vehicle.toObject());

    return house.save();
  }

  async removeVehicle(_id: string, vehicle_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Remove the vehicle from the house
    house.vehicles = house.vehicles.filter(
      (vehicle) => vehicle._id.toString() !== vehicle_id.toString(),
    );

    return house.save();
  }

  async findVisitors(_id: string): Promise<Visitor[]> {
    // 1. Find the house
    const house = await this.house_model
      .findById(_id)
      .populate('visitors')
      .exec();
    return house.visitors;
  }

  async addVisitor(_id: string, visitor_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Get the visitor
    const visitor = await this.user_service.findOne(visitor_id);

    // 4. Check if the visitor exists
    if (!visitor) {
      throw new NotFoundException(`Visitor with ID ${visitor_id} not found`);
    }

    // 5. Update the house entity
    house.visitors.push(visitor.toObject());

    return house.save();
  }

  async removeVisitor(_id: string, visitor_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Remove the visitor from the house
    house.visitors = house.visitors.filter(
      (visitor) => visitor._id.toString() !== visitor_id.toString(),
    );

    return house.save();
  }
}
