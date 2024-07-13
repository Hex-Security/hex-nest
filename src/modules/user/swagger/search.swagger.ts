import { UserDto } from 'src/shared/dto/entities/user.dto';
import { SearchUserDto } from 'src/shared/dto/user/search-user.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const search_user: SwaggerOptions = {
  operation: {
    summary: 'Search for a user.',
    description: 'Search for a user by fields.',
    operationId: 'searchUser',
  },
  body: {
    description: 'The search criteria.',
    required: true,
    type: SearchUserDto,
  },
  ok_response: {
    description: 'User found',
    type: UserDto,
  },
};
