import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { EntityModule } from '../entity/entity.module';
import { VisitorController } from './visitor.controller';

@Module({
  imports: [EntityModule],
  providers: [VisitorService],
  exports: [VisitorService],
  controllers: [VisitorController],
})
export class VisitorModule {}
