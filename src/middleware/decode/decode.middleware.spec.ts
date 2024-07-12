import { DecodeParamMiddleware } from './decode.middleware';

describe('DecodeParamMiddleware', () => {
  let middleware: DecodeParamMiddleware;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    middleware = new DecodeParamMiddleware();
    req = {
      params: {
        param1: 'Hello%20World',
        param2: 'foo%20bar',
      },
    };
    res = {};
    next = jest.fn();
  });

  it('should decode URL parameters', () => {
    middleware.use(req, res, next);

    expect(req.params.param1).toBe('Hello World');
    expect(req.params.param2).toBe('foo bar');
    expect(next).toHaveBeenCalled();
  });

  it('should call next function', () => {
    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
