import { ResponseInterceptor } from './response.interceptor';
import { Reflector } from '@nestjs/core';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;
  let reflector: Reflector;
  let context: ExecutionContext;
  let next: any;

  beforeEach(() => {
    reflector = new Reflector();
    interceptor = new ResponseInterceptor(reflector);
    context = {} as ExecutionContext;
    next = {
      handle: jest.fn(() => of('data')),
    };
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should intercept the request and return modified response', (done) => {
    const message = 'Custom message';
    jest.spyOn(reflector, 'get').mockReturnValueOnce(message);

    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        data: 'data',
        success: true,
        message: message,
        error: [],
      });
      done();
    });
  });

  it('should handle BadRequestException and return error response', (done) => {
    const errorMessage = 'Bad request';
    const error = new BadRequestException(errorMessage);
    next.handle = jest.fn(() => throwError(() => error));

    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        data: null,
        success: false,
        message: errorMessage,
        error: [error],
      });
      done();
    });
  });
});
