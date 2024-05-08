import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { EntityModule } from '../entity/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [EntityModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
