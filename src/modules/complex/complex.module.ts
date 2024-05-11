import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '../db/db.module';
import { Complex } from '../entity/entities/complex.entity';
import { User } from '../entity/entities/user.entity';
import { EntityModule } from '../entity/entity.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';

@Module({
  imports: [
    EntityModule,
    DbModule,
    TypeOrmModule.forFeature([Complex, User]),
    UserModule,
  ],
  controllers: [ComplexController],
  providers: [ComplexService, UserService],
  exports: [ComplexService],
})
export class ComplexModule {}
