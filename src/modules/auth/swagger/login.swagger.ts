import { EndpointDoc } from 'src/shared/dto/swagger/endpoint-doc.dto';
import { LoginDto } from '../dto/login.dto';

export const login: EndpointDoc = {
  operation: {
    summary: 'Login user',
    description: 'Login user to the system',
  },
  body: {
    description: 'User data for login',
    required: true,
    type: LoginDto,
  },
  ok_response: {
    description: 'User logged in successfully',
    type: 'string',
  },
};
