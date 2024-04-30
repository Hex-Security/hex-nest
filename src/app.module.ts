import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from './modules/entity/entity.module';
import { ComplexModule } from './modules/complex/complex.module';
import { DbModule } from './modules/db/db.module';

@Module({
  imports: [EntityModule, ComplexModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
