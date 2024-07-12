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
    examples: {
      example: {
        description: 'Update user data',
        value: {
          username: 'new_username',
          phone: 'new_phone',
          birth_date: 'new_birth_date',
        },
      },
    },
  },
  ok_response: {
    description: 'User updated',
    example: {
      _id: 'mongo_id',
      uid: 'firebase_uid',
      email: 'email',
      username: 'new_username',
      first_name: 'first_name',
      last_name: 'last_name',
      phone: 'new_phone',
      birth_date: 'neW_birth_date',
    },
  },
};
