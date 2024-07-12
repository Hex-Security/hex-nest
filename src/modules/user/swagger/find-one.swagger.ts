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
    example: {
      _id: 'mongo_id',
      uid: 'firebase_uid',
      email: 'email',
      username: 'username',
      first_name: 'first_name',
      last_name: 'last_name',
      phone: 'phone',
      birth_date: 'birth_date',
    },
  },
};
