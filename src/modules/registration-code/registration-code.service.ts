import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  RegistrationCode,
  RegistrationCodeDocument,
} from 'src/schemas/registration-codes.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateRegistrationCodeDto } from 'src/shared/dto/registration-code/create-registration-code.dto';
import { ValidateRegistrationCodeDto } from 'src/shared/dto/registration-code/validate-code.dto';
import { genRegistrationCode } from 'src/utils/gen-code';
import { hashCodePayload } from 'src/utils/hash';
import { ComplexService } from '../complex/complex.service';
import { RolesEnum } from 'src/shared/enum/roles.enum';

@Injectable()
export class RegistrationCodeService {
  constructor(
    @InjectModel(RegistrationCode.name)
    private readonly reg_code_model: Model<RegistrationCodeDocument>,
    private readonly complex_service: ComplexService,
  ) {}

  async create(
    dto: CreateRegistrationCodeDto,
    user: UserDocument,
  ): Promise<RegistrationCodeDocument> {
    // 1. Check that there are no active codes for the same email and role
    const existing_code = await this.reg_code_model
      .findOne({ email: dto.email, active: true, role: dto.role })
      .exec();

    if (existing_code) {
      return existing_code;
    }

    // 1. Calculate the secret random code
    const code = genRegistrationCode();

    // 2. Get the complex from the DTO
    const complex = await this.complex_service.findOne(dto.complex);

    // 3. Calculate the hash of the payload
    const hash = hashCodePayload({
      code,
      email: dto.email,
      role: dto.role,
      emitter: user._id.toString(),
      complex: complex._id.toString(),
    });

    // 4. Create the document
    const created_code = new this.reg_code_model({
      _id: new mongoose.Types.ObjectId(),
      code,
      hash,
      email: dto.email,
      role: dto.role,
      emitter: user._id,
      complex: complex._id,
    });

    // 5. Save the document
    return created_code.save();
  }

  async findAll(): Promise<RegistrationCodeDocument[]> {
    return this.reg_code_model.find().exec();
  }

  async findOne(id: string): Promise<RegistrationCodeDocument> {
    return this.reg_code_model.findById(id).exec();
  }

  async findByCode(code: string): Promise<RegistrationCodeDocument> {
    return this.reg_code_model.findOne({ code }).exec();
  }

  async deactivate(id: string): Promise<RegistrationCodeDocument> {
    return this.reg_code_model
      .findByIdAndUpdate(id, { active: false }, { new: true })
      .exec();
  }

  async activate(id: string): Promise<RegistrationCodeDocument> {
    return this.reg_code_model
      .findByIdAndUpdate(id, { active: true }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<RegistrationCodeDocument> {
    return this.reg_code_model.findByIdAndDelete(id).exec();
  }

  async validate(dto: ValidateRegistrationCodeDto): Promise<boolean> {
    // 1. Find the document by code
    const code_doc = await this.findByCode(dto.code);

    // 2. Calculate the hash of the payload
    const expected_hash = hashCodePayload(dto);

    // console.log('Expected_Hash', expected_hash);
    // console.log('DB Hash', code_doc.hash);
    console.log('Are same? ', code_doc.hash === expected_hash);

    // 3. Compare the hashes
    if (code_doc.hash !== expected_hash) {
      throw new BadRequestException('The registration payload is not valid');
    }

    return true;
  }

  async addAccount(
    _id: string,
    _uid: string,
  ): Promise<RegistrationCodeDocument> {
    return this.reg_code_model
      .findOneAndUpdate({ _id }, { account: _uid }, { new: true })
      .exec();
  }
}
