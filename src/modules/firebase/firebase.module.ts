import { Module } from '@nestjs/common';
import { FirebaseClientService } from './firebase-client.service';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService, FirebaseClientService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
