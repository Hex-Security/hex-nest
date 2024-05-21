import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complex } from '../entity/entities/complex.entity';
import { User } from '../entity/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complex, User]), UserModule],
  controllers: [ComplexController],
  providers: [ComplexService, UserService],
  exports: [ComplexService],
})
export class ComplexModule {}
