import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { auth } from 'express-oauth2-bearer';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly user_service: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (
      process.env.AUTH0_DOMAIN === undefined ||
      process.env.AUTH0_AUDIENCE === undefined ||
      process.env.AUTH0_CLIENT_SECRET === undefined
    ) {
      throw new InternalServerErrorException(
        'Auth0 environment variables not set for AuthorizationGuard to consume.',
      );
    }
    const validateAccessToken = (req, res: Response): Promise<void> => {
      return new Promise((resolve, reject) => {
        auth({
          issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
          allowedAudiences: process.env.AUTH0_AUDIENCE,
          secret: process.env.AUTH0_CLIENT_SECRET,
        })(req, res, async (err: Error) => {
          if (err) {
            reject(err);
          } else {
            console.log(req.auth);
            req.authInfo = req.auth; // Attach the auth info to the request object

            req.user = await this.user_service.findOne(req.authInfo.claims.sub);

            resolve();
          }
        });
      });
    };

    try {
      await validateAccessToken(request, response);

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Error validating the token information');
    }
  }
}
