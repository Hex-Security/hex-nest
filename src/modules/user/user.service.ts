import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/shared/dto/user/create-user.dto';
import { SearchUserDto } from 'src/shared/dto/user/search-user.dto';
import { UpdateUserDto } from 'src/shared/dto/user/update-user.dto';
import { ComplexService } from '../complex/complex.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly user_model: Model<UserDocument>,
    @Inject(forwardRef(() => ComplexService))
    private readonly complex_service: ComplexService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const created_user = new this.user_model(dto);
    return created_user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.user_model.find().exec();
  }

  async findOne(_id: string): Promise<UserDocument> {
    const user = await this.user_model.findById(_id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_model
      .findOne({
        username,
      })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    const updatedUser = await this.user_model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.user_model
      .findOneAndDelete({
        _id: id,
      })
      .exec();

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_model.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findByPhone(phone: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_model.findOne({ phone }).exec();

    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }

    return user;
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.user_model.exists({ _id: id }).exec();
    return result !== null;
  }

  async existsEmail(email: string): Promise<boolean> {
    const result = await this.user_model.exists({ email }).exec();
    return result !== null;
  }

  async search(dto: SearchUserDto): Promise<UserDocument> {
    const query: any = {};

    // Build the query dynamically based on DTO fields
    if (dto._id) {
      query._id = dto._id;
    }
    if (dto.uid) {
      query.uid = dto.uid;
    }
    if (dto.email) {
      query.email = dto.email;
    }
    if (dto.username) {
      query.username = dto.username;
    }
    if (dto.first_name) {
      query.first_name = dto.first_name;
    }
    if (dto.last_name) {
      query.last_name = dto.last_name;
    }
    if (dto.phone) {
      query.phone = dto.phone;
    }
    if (dto.role) {
      query.role = dto.role;
    }

    const user: UserDocument = await this.user_model.findOne(query).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async addGuardComplex(
    _id: string,
    complex_id: string,
  ): Promise<UserDocument> {
    // 1. Find the user
    const user = await this.findOne(_id);

    // 2. Find the complex
    const complex = await this.complex_service.findOne(complex_id);

    // 2. Check if the complex is already in the list
    if (
      user.data.guard.complexes.some(
        (complex) => complex._id.toString() === complex._id.toString(),
      )
    ) {
      return user; // Complex already exists
    }

    // 3. Add the complex to the list
    user.data.guard.complexes.push(complex);

    return user.save();
  }

  async addAdminComplex(
    _id: string,
    complex_id: string,
  ): Promise<UserDocument> {
    // 1. Find the user
    const user = await this.findOne(_id);

    // 2. Find the complex
    const complex = await this.complex_service.findOne(complex_id);

    // 2. Check if the complex is already in the list
    if (
      user.data.admin.complexes.some(
        (complex) => complex._id.toString() === complex._id.toString(),
      )
    ) {
      return user; // Complex already exists
    }

    // 3. Add the complex to the list
    user.data.admin.complexes.push(complex);

    return user.save();
  }
}
