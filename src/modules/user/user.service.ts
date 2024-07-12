import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dto/entities/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly user_model: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const created_user = new this.user_model(dto);
    return created_user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.user_model.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.user_model.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.user_model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
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
}
