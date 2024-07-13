import { CreateComplexDto } from 'src/shared/dto/complex/create-complex.dto';
import { ComplexDto } from 'src/shared/dto/entities/complex.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const create_complex: SwaggerOptions = {
  operation: {
    description: 'Create a new complex',
    summary: 'Create complex',
  },
  body: {
    description: 'Complex data',
    required: true,
    type: CreateComplexDto,
  },
  ok_response: {
    description: 'Complex created successfully',
    type: ComplexDto,
  },
};
