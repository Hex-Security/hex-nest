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

    // 4. Update complex entity
    await this.complex_service.addHouse(complex_id, _id.toString());

    // 5. Update user owner entity
    await this.user_service.addHouse(dto.owner_id, _id.toString());

    // 4. Create the house
    const created_house = new this.house_model({
      _id,
      ...dto,
      complex,
    });

    return created_house.save();
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

  async delete(id: string): Promise<HouseDocument> {
    return this.house_model.findByIdAndDelete(id).exec();
  }
}
