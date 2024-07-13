import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RESPONSE_MESSAGE_KEY } from 'src/decorator/response.decorator';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );

    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        data,
        success: true,
        message: message || 'Request successful',
        error: [],
      })),
      catchError((error) => {
        console.log('Error:', error);

        if (
          error instanceof BadRequestException ||
          error instanceof NotFoundException ||
          error instanceof HttpException
        ) {
          response.status(error.getStatus()).json({
            data: null,
            success: false,
            message: error.message,
            error: [error],
          });
          return throwError(() => new Error(error.message));
        }

        // For any other errors, return the error as is
        response.status(500).json({
          data: null,
          success: false,
          message: 'Internal server error',
          error: [error],
        });
        return throwError(() => new Error('Internal server error'));
      }),
    );
  }
}
