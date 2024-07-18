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
      owner: await this.user_service.findOne(dto.owner_id),
      complex,
    }).save();

    // 5. Update complex entity
    await this.complex_service.addHouse(complex_id, _id.toString());

    // 6. Update user owner entity
    await this.user_service.addHouse(dto.owner_id, _id.toString());

    return created_house;
  }

  async findAll(): Promise<HouseDocument[]> {
    return this.house_model.find().exec();
  }

  async findAllByComplex(complex_id: string): Promise<HouseDocument[]> {
    return this.house_model.find({ complex: complex_id }).exec();
  }

  async findOne(id: string): Promise<HouseDocument> {
    return this.house_model.findById(id).exec();
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

  async addResident(_id: string, resident_id: string): Promise<HouseDocument> {
    // 1. Find the house
    const house = await this.findOne(_id);

    // 2. Check if the house exists
    if (!house) {
      throw new NotFoundException(`House with ID ${_id} not found`);
    }

    // 3. Get the user resident
    const resident = await this.user_service.findOne(resident_id);

    // 3. Check if the resident already exists
    if (
      house.residents.some(
        (resident) => resident._id.toString() === resident_id.toString(),
      )
    ) {
      return house; // Resident already exists
    }

    // 3. Update the house entity
    house.residents.push(resident);

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
}
