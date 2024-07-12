import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [EntityModule],
  providers: [VisitorService],
  exports: [VisitorService],
})
export class VisitorModule {}
