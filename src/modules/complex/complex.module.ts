import { Module } from '@nestjs/common';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';
import { EntityModule } from '../entity/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complex } from '../entity/entities/complex.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EntityModule, TypeOrmModule.forFeature([Complex]), UserModule],
  controllers: [ComplexController],
  providers: [ComplexService],
})
export class ComplexModule {}
