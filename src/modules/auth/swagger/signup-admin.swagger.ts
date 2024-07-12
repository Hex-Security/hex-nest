import { RegisterAdminDto } from 'src/shared/dto/auth/register-admin.dto';
import { UserDto } from 'src/shared/dto/entities/user.dto';
import { EndpointDoc } from 'src/shared/dto/swagger/endpoint-doc.dto';

export const signup_admin: EndpointDoc = {
  operation: {
    summary: 'Signup a new admin',
    description: 'Create a new admin in the system',
  },
  body: {
    description: 'Admin data for signup',
    required: true,
    type: RegisterAdminDto,
  },
  ok_response: {
    description: 'Admin created successfully',
    type: UserDto,
  },
};
