import {
  UpdateComplexDto,
  UpdatedComplexDto,
} from 'src/shared/dto/complex/update-complex.dto';
import { ComplexDto } from 'src/shared/dto/entities/complex.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const update_complex: SwaggerOptions = {
  operation: {
    summary: 'Update a complex by id',
    description: 'This endpoint will update a complex by its id',
  },
  param: {
    name: 'complex_id',
    required: true,
    description: 'The id of the complex',
    schema: {
      type: 'string',
    },
  },
  body: {
    description: 'The complex data to update',
    type: UpdateComplexDto,
  },
  ok_response: {
    description: 'The complex was updated and returned',
    type: UpdatedComplexDto,
  },
};
