import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';

@Module({
  providers: [VisitorService]
})
export class VisitorModule {}
