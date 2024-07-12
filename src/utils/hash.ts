import * as crypto from 'crypto';
import { CreateRegistrationCodeDto } from 'src/shared/dto/registration-code/create-registration-code.dto';
import { ValidateRegistrationCodeDto } from 'src/shared/dto/registration-code/validate-code.dto';

export const hashCodePayload = (dto: ValidateRegistrationCodeDto): string => {
  // Convert DTO to a string (you may need to serialize it based on your DTO structure)
  const dataString = JSON.stringify(dto);

  // Create a hash object
  const hash = crypto.createHash('sha256');

  // Update the hash object with your data
  hash.update(dataString);

  // Generate the hash digest (hexadecimal format)
  return hash.digest('hex');
};
