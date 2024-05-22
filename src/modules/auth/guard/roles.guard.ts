// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`[Request] ${req.method} ${req.originalUrl}`);
    const start = Date.now();

    res.on('finish', () => {
      // Event when the response has been sent
      const duration = Date.now() - start;
      console.log(
        `[Response] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}
