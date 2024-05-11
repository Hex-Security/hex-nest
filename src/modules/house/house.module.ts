import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '../db/db.module';
import { House } from '../entity/entities/house.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([House]), UserModule],
  providers: [HouseService, UserService],
  controllers: [HouseController],
  exports: [HouseService],
})
export class HouseModule {}
