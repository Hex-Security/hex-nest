import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { FirebaseService } from '../firebase/firebase.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
    private firebaseService: FirebaseService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.http.pingCheck('nestjs-docs', 'http://localhost:15434/docs'), // URL de tu documentación
      async () => this.mongoose.pingCheck('mongo'),
      async () => this.checkFirebaseAuth(),
    ]);
  }

  async checkFirebaseAuth(): Promise<HealthIndicatorResult> {
    try {
      await this.firebaseService.checkHealth();
      return {
        firebase: {
          status: 'up',
        },
      };
    } catch (error) {
      return {
        firebase: {
          status: 'down',
          message: error.message,
        },
      };
    }
  }
}
