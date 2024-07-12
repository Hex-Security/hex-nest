import {
  ApiBodyOptions,
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export interface SwaggerOptions {
  operation?: ApiOperationOptions;
  param?: ApiParamOptions;
  params?: ApiParamOptions[];
  body?: ApiBodyOptions;
  ok_response?: ApiResponseOptions;
  not_found_response?: ApiResponseOptions;
  forbidden_response?: ApiResponseOptions;
  unauthorized_response?: ApiResponseOptions;
  bad_request_response?: ApiResponseOptions;
  internal_error_response?: ApiResponseOptions;
}
