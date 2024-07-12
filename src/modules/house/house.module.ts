import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [EntityModule],
  providers: [HouseService],
  controllers: [HouseController],
  exports: [HouseService],
})
export class HouseModule {}
