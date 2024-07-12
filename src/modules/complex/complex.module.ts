import { Module } from '@nestjs/common';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [EntityModule],
  controllers: [ComplexController],
  providers: [ComplexService],
  exports: [ComplexService],
})
export class ComplexModule {}
