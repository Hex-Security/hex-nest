import { CreateRegistrationCodeDto } from 'src/shared/dto/registration-code/create-registration-code.dto';
import { RegistrationCodeDto } from 'src/shared/dto/registration-code/registration-code.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const create_code: SwaggerOptions = {
  operation: {
    tags: ['registration-code'],
    summary: 'Create registration code',
    description: 'Create a registration code',
  },
  body: {
    description: 'Registration code data',
    required: true,
    type: CreateRegistrationCodeDto,
  },
  ok_response: {
    description: 'Registration code created successfully',
    type: RegistrationCodeDto,
  },
};
