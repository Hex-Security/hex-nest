// firebase.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Request } from 'express';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken: DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token);

      request.res.locals.user = decodedToken;
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }
  }
}
