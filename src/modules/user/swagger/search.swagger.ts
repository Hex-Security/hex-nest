import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const search: SwaggerOptions = {
  operation: {
    summary: 'Search for a user.',
    description: 'Search for a user by fields.',
    operationId: 'searchUser',
  },
  body: {
    description: 'The search criteria.',
    required: true,
    examples: {
      search: {
        value: {
          email: 'email',
          username: 'username',
          first_name: 'first_name',
          last_name: 'last_name',
          phone: 'phone',
          birth_date: 'birth_date',
        },
      },
    },
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
