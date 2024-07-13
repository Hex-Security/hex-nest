import { RegisterUserDto } from 'src/shared/dto/auth/register-user.dto';
import { UserDto } from 'src/shared/dto/entities/user.dto';
import { EndpointDoc } from 'src/shared/dto/swagger/endpoint-doc.dto';

export const signup_user: EndpointDoc = {
  operation: {
    summary: 'Signup a new user',
    description: 'Create a new user in the system',
  },
  body: {
    description: 'User data for signup',
    required: true,
    type: RegisterUserDto,
  },
  ok_response: {
    description: 'User created successfully',
    type: UserDto,
  },
};
