import { UserDto } from 'src/shared/dto/entities/user.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const find_one: SwaggerOptions = {
  operation: {
    summary: 'Find one user',
    description: 'Find one user by ID',
  },
  param: {
    name: '_id',
    required: true,
    description: 'User ID',
  },
  ok_response: {
    description: 'User found',
    type: UserDto,
  },
};
