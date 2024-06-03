import { EndpointDoc } from 'src/shared/dto/endpoint-doc.dto';

export const login: EndpointDoc = {
  operation: {
    summary: 'Login user',
    description: 'Login user to the system',
  },
  body: {
    description: 'User data for login',
    required: true,
    examples: {
      'User Login': {
        value: {
          email: 'resident@email.com',
          password: 'password123!--',
        },
      },
    },
  },
};
