import { EndpointDoc } from 'src/shared/dto/endpoint-doc.dto';

export const signup: EndpointDoc = {
  operation: {
    summary: 'Signup a new user',
    description: 'Create a new user in the system',
  },
  body: {
    description: 'User data for signup',
    required: true,
    examples: {
      'User Signup': {
        value: {
          email: 'resident@email.com',
          password: 'password123!--',
          name: 'John',
          lname: 'Doe',
          username: 'johndoe',
        },
      },
    },
  },
};
