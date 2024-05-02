import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { EntityModule } from '../entity/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/entities/user.entity';

@Module({
  imports: [EntityModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
