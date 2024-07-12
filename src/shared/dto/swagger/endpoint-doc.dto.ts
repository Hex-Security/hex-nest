import {
  ApiBodyOptions,
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export interface EndpointDoc {
  operation?: ApiOperationOptions;
  param?: ApiParamOptions | ApiParamOptions[];
  body?: ApiBodyOptions;
  ok_response?: ApiResponseOptions;
  not_found?: ApiResponseOptions;
  bad_request?: ApiResponseOptions;
}
