import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './middleware/response/response.interceptor';
import { AccessModule } from './modules/access/access.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplexModule } from './modules/complex/complex.module';
import { DbModule } from './modules/db/db.module';
import { HouseModule } from './modules/house/house.module';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    AccessModule,
    ComplexModule,
    HouseModule,
    UserModule,
    VehicleModule,
    VisitorModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    Reflector,
  ],
})
export class AppModule {}
