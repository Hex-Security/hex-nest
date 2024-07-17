import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { FirebaseService } from '../firebase/firebase.service';
import { EntityModule } from '../entity/entity.module';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Module({
  imports: [TerminusModule, EntityModule, HttpModule],
  controllers: [HealthController],
  providers: [FirebaseService, FirebaseService, FirebaseClientService],
})
export class HealthModule {}
