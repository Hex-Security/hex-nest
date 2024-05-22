import { SetMetadata } from '@nestjs/common';
export const RESPONSE_MESSAGE_KEY = 'response_message';
/**
 * Decorator function that sets the metadata for the response message.
 * @param data - The data to be set as metadata.
 */
export const ResponseMessage = (data: any) =>
  SetMetadata(RESPONSE_MESSAGE_KEY, data);
