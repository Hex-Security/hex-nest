import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [EntityModule],
  providers: [AccessService],
  exports: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
