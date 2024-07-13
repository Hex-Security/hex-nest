import {
  BadRequestException,
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
import { RegisterUserDto } from 'src/shared/dto/auth/register-user.dto';
import { RegisterBaseDto } from 'src/shared/dto/auth/register-base.dto';
import { RegistrationCodeDocument } from 'src/schemas/registration-codes.schema';
import { RegisterCodeDto } from 'src/shared/dto/auth/register-code.dto';

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

  async signUp(
    dto: RegisterBaseDto,
    role: RolesEnum,
  ): Promise<SignupResponseDto> {
    let stage = 0;
    let reg_code: RegistrationCodeDocument;

    const { code } = dto as RegisterCodeDto;

    try {
      if (role !== RolesEnum.DEV) {
        // 1. Check if registration code is valid
        // 1.1 Get registration code for admin
        reg_code = await this.registration_code_service.findByCode(code);

        // 1.2 Check if registration code is valid
        const is_valid_code =
          reg_code &&
          (await this.registration_code_service.validate({
            code: code,
            email: dto.email,
            role,
            emitter: reg_code.emitter._id.toString(),
          }));

        if (!is_valid_code) {
          throw new BadRequestException('Invalid registration code');
        }
      }

      stage++;

      // 2. Create custom ObjectId
      const _id = new mongoose.Types.ObjectId().toString();

      // 3. Create user in Firebase Auth
      const fb_user = await this.firebase_service.signUp(dto, _id, role);

      stage++;

      // 4. Create user on our DB
      let user_doc = await this.user_service.create({
        _id,
        uid: fb_user.user.uid,
        email: dto.email,
        username: dto.username,
        first_name: dto.first_name,
        last_name: dto.last_name,
        role,
        birth_date: new Date(dto.dob),
      });

      stage++;

      if (role !== RolesEnum.DEV) {
        // 5. Deactivate registration code
        await this.registration_code_service.deactivate(
          reg_code._id.toString(),
        );

        // 6. Update related entities
        // 6.1 Get complex from registration code
        const complex = reg_code.complex;

        // 6.1.a Update admin related entities
        if (
          role === RolesEnum.ADMIN &&
          complex !== undefined &&
          complex._id !== undefined
        ) {
          // 6.1.a.1 Get admin and complex entities
          const adminToAdd = await this.user_service.findOne(_id);
          const complexToAdd = await this.complex_service.findOne(
            complex._id.toString(),
          );

          // 6.1.a.2 Add admin to complex entity
          await this.complex_service.addAdmin(
            complex._id.toString(),
            adminToAdd,
          );
          // 6.1.a.3 Add complex to admin entity
          user_doc = await this.user_service.addAdminComplex(_id, complexToAdd);
          // 6.1.b Update guard related entities
        } else if (
          role === RolesEnum.GUARD &&
          complex !== undefined &&
          complex._id !== undefined
        ) {
          // 6.1.b.1 Get guard and complex entities
          const guardToAdd = await this.user_service.findOne(_id);
          const complexToAdd = await this.complex_service.findOne(
            complex._id.toString(),
          );

          // 6.1.b.2 Add guard to complex entity
          await this.complex_service.addGuard(
            complex._id.toString(),
            guardToAdd,
          );
          // 6.1.b.3 Add complex to guard entity
          user_doc = await this.user_service.addGuardComplex(_id, complexToAdd);
        }
      }

      stage++;

      // TODO: Implement email sender
      // 7. Send email to admin
      // 8. Send email to guard
      // 9. Send email to complex

      return { user: user_doc, token: fb_user.token };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    } finally {
      if (stage > 0) {
        try {
          // Rollback
          console.log('Rollback for stage', stage);

          const user = await this.user_service.findByEmail(dto.email);

          // Delete user from Firebase Auth
          if (stage >= 1) {
            console.log('Deleting user from Firebase Auth');
            await this.firebase_service.deleteUser(user.email);
          }

          // Delete user from our DB
          if (stage >= 2) {
            console.log('Deleting user from our DB');
            await this.user_service.remove(user._id.toString());
          }

          console.log(
            `User with email ${dto.email} deleted from Firebase Auth`,
          );
        } catch (error) {
          console.log('Error on rollback', error);
        }
      }
    }
  }
}
