import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { UserToken } from 'src/shared/dto/firebase/user-token.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { UserDocument } from 'src/schemas/user.schema';
import mongoose from 'mongoose';
import { RegisterGuardDto } from 'src/shared/dto/auth/register-guard.dto';
import { isEmail } from 'class-validator';
import { RegistrationCodeService } from '../registration-code/registration-code.service';
import { ComplexService } from '../complex/complex.service';
import { RegisterAdminDto } from 'src/shared/dto/auth/register-admin.dto';
import { RegisterDto } from 'src/shared/dto/auth/register-base.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly user_service: UserService,
    private readonly firebase_service: FirebaseService,
    private readonly registration_code_service: RegistrationCodeService,
    private readonly complex_service: ComplexService,
  ) {}

  async login(dto: LoginDto): Promise<FirebaseToken> {
    const { emailOrUsername, password } = dto;

    // 1. Check if is email or username
    const user = isEmail(emailOrUsername)
      ? await this.user_service.findByEmail(emailOrUsername)
      : await this.user_service.findByUsername(emailOrUsername);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.firebase_service.login(user.email, password);
  }

  // User methoods
  async signUpUser(dto: RegisterDto): Promise<SignupResponseDto> {
    let stage = 0;

    try {
      const { email, first_name, last_name, username, dob } = dto;

      // 1. Validate if user already exists
      if (await this.user_service.existsEmail(email)) {
        throw new ConflictException(`User with email ${email} already exists`);
      }

      // 2. Create custom ObjectId
      const _id = new mongoose.Types.ObjectId().toString();

      // 3. Create user in Firebase Auth
      const fb_user: UserToken = await this.firebase_service.signUp(
        dto,
        _id,
        RolesEnum.USER,
      );

      stage++;

      // 4. Create user on our DB
      const user: UserDocument = await this.user_service.create({
        _id,
        uid: fb_user.user.uid,
        email,
        username,
        first_name,
        last_name,
        role: RolesEnum.USER,
        birth_date: dob,
      });

      stage++;

      return { user, token: fb_user.token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    } finally {
      if (stage < 2) {
        // Rollback
        console.log('Rollback');

        // Delete user from Firebase Auth
        await this.firebase_service.deleteUser(dto.email);

        console.log(`User with email ${dto.email} deleted from Firebase Auth`);
      }
    }
  }

  // Guard methods
  async signUpGuard(dto: RegisterGuardDto): Promise<SignupResponseDto> {
    let stage = 0;

    try {
      const { email, first_name, last_name, username, dob, code } = dto;

      // 1. Check if registration code is valid
      // 1.1 Get registration code for guard
      const reg_code = await this.registration_code_service.findByCode(code);

      // 1.2 Check if registration code is valid
      const is_valid_code = await this.registration_code_service.validate({
        code,
        email,
        role: RolesEnum.GUARD,
        emitter: reg_code.admin._id.toString(),
      });

      if (!is_valid_code) {
        throw new NotFoundException('Invalid registration code');
      }

      // 2. Create custom ObjectId
      const _id = new mongoose.Types.ObjectId().toString();

      // 3. Create user in Firebase Auth
      const fb_user = await this.firebase_service.signUp(
        dto,
        _id,
        RolesEnum.GUARD,
      );

      stage++;

      // 4. Create user on our DB
      let guard_doc = await this.user_service.create({
        _id,
        uid: fb_user.user.uid,
        email,
        username,
        first_name,
        last_name,
        role: RolesEnum.GUARD,
        birth_date: dob,
      });

      stage++;

      // 5. Deactivate registration code
      await this.registration_code_service.deactivate(reg_code._id.toString());

      // 6. Update related entities
      // 6.1 Get complex from registration code
      const complex = reg_code.complex;

      if (complex) {
        // 6.2 Get guard and complex entities
        const guardToAdd = await this.user_service.findOne(_id);
        const complexToAdd = await this.complex_service.findOne(
          complex._id.toString(),
        );

        // 6.3 Add guard to complex entity
        await this.complex_service.addGuard(complex._id.toString(), guardToAdd);
        // 6.4 Add complex to guard entity
        guard_doc = await this.user_service.addGuardComplex(_id, complexToAdd);
      }

      // TODO: Implement email sender
      // 7. Send email to admin
      // 8. Send email to guard
      // 9. Send email to complex

      return { user: guard_doc, token: fb_user.token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    } finally {
      if (stage < 2) {
        // Rollback
        console.log('Rollback');

        // Delete user from Firebase Auth
        await this.firebase_service.deleteUser(dto.email);

        console.log(`User with email ${dto.email} deleted from Firebase Auth`);
      }
    }
  }

  async signUpAdmin(dto: RegisterAdminDto): Promise<SignupResponseDto> {
    let stage = 0;

    try {
      // 1. Check if registration code is valid
      // 1.1 Get registration code for admin
      const reg_code = await this.registration_code_service.findByCode(
        dto.code,
      );

      // 1.2 Check if registration code is valid
      const is_valid_code = await this.registration_code_service.validate({
        code: dto.code,
        email: dto.email,
        role: RolesEnum.ADMIN,
        emitter: reg_code.admin._id.toString(),
      });

      if (!is_valid_code) {
        throw new NotFoundException('Invalid registration code');
      }

      // 2. Create custom ObjectId
      const _id = new mongoose.Types.ObjectId().toString();

      // 3. Create user in Firebase Auth
      const fb_user = await this.firebase_service.signUp(
        dto,
        _id,
        RolesEnum.ADMIN,
      );

      stage++;

      // 4. Create user on our DB
      let admin_doc = await this.user_service.create({
        _id,
        uid: fb_user.user.uid,
        email: dto.email,
        username: dto.username,
        first_name: dto.first_name,
        last_name: dto.last_name,
        role: RolesEnum.ADMIN,
        birth_date: dto.dob,
      });

      stage++;

      // 5. Deactivate registration code
      await this.registration_code_service.deactivate(reg_code._id.toString());

      // 6. Update related entities
      // 6.1 Get complex from registration code
      const complex = reg_code.complex;

      if (complex) {
        // 6.2 Get admin and complex entities
        const adminToAdd = await this.user_service.findOne(_id);
        const complexToAdd = await this.complex_service.findOne(
          complex._id.toString(),
        );

        // 6.3 Add admin to complex entity
        await this.complex_service.addAdmin(complex._id.toString(), adminToAdd);
        // 6.4 Add complex to admin entity
        admin_doc = await this.user_service.addAdminComplex(_id, complexToAdd);
      }

      // TODO: Implement email sender
      // 7. Send email to admin
      // 8. Send email to guard
      // 9. Send email to complex

      return { user: admin_doc, token: fb_user.token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    } finally {
      if (stage < 2) {
        // Rollback
        console.log('Rollback');

        // Delete user from Firebase Auth
        await this.firebase_service.deleteUser(dto.email);

        console.log(`User with email ${dto.email} deleted from Firebase Auth`);
      }
    }
  }
}
