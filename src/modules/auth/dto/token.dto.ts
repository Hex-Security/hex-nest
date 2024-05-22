import { IsArray, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  /**
   * The access token.
   */
  @IsString()
  access_token: string;

  /**
   * The expiration time of the token in seconds.
   */
  @IsNumber()
  expires_in: number;

  /**
   * The scope of the token.
   */
  @IsString()
  scope: string;

  /**
   * The type of the token.
   */
  @IsString()
  token_type: string;
}

export class TokenPayload {
  @IsString()
  token: string;
  claims: TokenPayloadClaims;
}

export class TokenPayloadClaims {
  @IsString()
  iss: string;
  @IsString()
  sub: string;
  @IsArray()
  @IsString({ each: true })
  aud: string[];
  @IsNumber()
  iat: number;
  @IsNumber()
  exp: number;
  @IsString()
  scope: string;
  @IsString()
  gty: string;
  @IsString()
  azp: string;
}
