import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RESPONSE_MESSAGE } from 'src/decorator/response.decorator';

interface Response<T> {
  data: T;
  success: boolean;
  message: string;
  error: any[];
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => ({
        data,
        success: true,
        message: message || 'Request successful',
        error: [],
      })),
      catchError((error) => {
        return throwError(() => {
          if (error instanceof BadRequestException) {
            // Add additional handling for specific error types if needed
            return {
              data: null,
              success: false,
              message: error.message,
              error: [error],
            };
          }
          return error;
        });
      }),
    );
  }
}
