import {
  UpdatedUserDto,
  UpdateUserDto,
} from 'src/shared/dto/user/update-user.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const update_one: SwaggerOptions = {
  operation: {
    summary: 'Update one user',
    description: 'Update one user by ID',
  },
  param: {
    name: '_id',
    required: true,
    description: 'User ID',
  },
  body: {
    required: true,
    description: 'User data',
    type: UpdateUserDto,
  },
  ok_response: {
    description: 'User updated',
    type: UpdatedUserDto,
  },
};
