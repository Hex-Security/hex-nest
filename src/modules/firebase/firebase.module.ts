import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';


@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor() {
    const service_account = require('../../../hex-nest-firebase-adminsdk-avvkg-49174f9ce6.json');

    admin.initializeApp({credential: admin.credential.cert(service_account)});
}
