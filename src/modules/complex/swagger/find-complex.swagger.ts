import { ComplexDto } from 'src/shared/dto/entities/complex.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const find_complex: SwaggerOptions = {
  operation: {
    summary: 'Find a complex by id',
    description: 'This endpoint will return a complex by its id',
  },
  param: {
    name: '_id',
    required: true,
    description: 'The id of the complex',
    schema: {
      type: 'string',
    },
  },
  ok_response: {
    description: 'The complex was found and returned',
    type: ComplexDto,
  },
};
