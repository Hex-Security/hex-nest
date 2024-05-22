import { DecodeMiddleware } from './decode.middleware';

describe('DecodeMiddleware', () => {
  it('should be defined', () => {
    expect(new DecodeMiddleware()).toBeDefined();
  });
});
