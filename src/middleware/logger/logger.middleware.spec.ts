import { LoggerMiddleware } from './logger.middleware';
import { Request, Response } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    req = {
      method: 'GET',
      url: '/test',
    };
    res = {
      statusCode: 200,
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
        return res as Response; // Ensure the return type matches Response
      }),
    };
    next = jest.fn();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should log request and response information', () => {
    // Act
    middleware.use(req as Request, res as Response, next);

    // Assert
    expect(console.log).toHaveBeenCalledWith('[Request] GET /test');
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[Response] GET /test 200 -'),
    );
    expect(next).toHaveBeenCalled();
  });
});
