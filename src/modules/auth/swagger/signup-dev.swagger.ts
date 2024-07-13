import { RegisterBaseDto } from 'src/shared/dto/auth/register-base.dto';
import { UserDto } from 'src/shared/dto/entities/user.dto';
import { EndpointDoc } from 'src/shared/dto/swagger/endpoint-doc.dto';

export const signup_dev: EndpointDoc = {
  operation: {
    summary: 'Signup a new dev',
    description: 'Create a new dev in the system',
  },
  body: {
    description: 'Dev data for signup',
    required: true,
    type: RegisterBaseDto,
  },
  ok_response: {
    description: 'Dev created successfully',
    type: UserDto,
  },
};
