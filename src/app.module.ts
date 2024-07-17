import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeParamMiddleware } from './middleware/decode/decode.middleware';
import { ResponseInterceptor } from './middleware/response/response.interceptor';
import { AccessModule } from './modules/access/access.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplexModule } from './modules/complex/complex.module';
import { DbModule } from './modules/db/db.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { HouseModule } from './modules/house/house.module';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { EntityModule } from './modules/entity/entity.module';
import { RegistrationCodeModule } from './modules/registration-code/registration-code.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    DbModule,
    EntityModule,
    AuthModule,
    // AccessModule,
    ComplexModule,
    // HouseModule,
    UserModule,
    RegistrationCodeModule,
    HealthModule,
    // VehicleModule,
    // VisitorModule,
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeParamMiddleware).forRoutes('*');
  }
}
