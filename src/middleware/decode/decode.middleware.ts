import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DecodeParamMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.params) {
      // Decode each URL parameter
      for (const param in req.params) {
        if (req.params.hasOwnProperty(param)) {
          req.params[param] = decodeURIComponent(req.params[param]);
        }
      }
    }
    next();
  }
}
