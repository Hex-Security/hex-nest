import { RegisterGuardDto } from 'src/shared/dto/auth/register-guard.dto';
import { UserDto } from 'src/shared/dto/entities/user.dto';
import { EndpointDoc } from 'src/shared/dto/swagger/endpoint-doc.dto';

export const signup_guard: EndpointDoc = {
  operation: {
    summary: 'Signup a new guard',
    description: 'Create a new guard in the system',
  },
  body: {
    description: 'Guard data for signup',
    required: true,
    type: RegisterGuardDto,
  },
  ok_response: {
    description: 'Guard created successfully',
    type: UserDto,
  },
};
