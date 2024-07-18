import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';

export class UserTokenDto {
  @ApiProperty({
    type: User,
    description: 'User data',
    example: {
      _id: '60f8c1f7d9f1f9001f3d5d1',
      username: 'test',
      email: 'user@email.com',
      role: 'user',
      createdAt: '2021-07-22T08:55:27.000Z',
      updatedAt: '2021-07-22T08:55:27.000Z',
    },
  })
  user: User;

  @ApiProperty({
    description: 'Firebase token',
    example: {
      idToken: 'eyJhb...',
      email: 'user@email.com',
      refreshToken: 'eyJhb...',
      expiresIn: '3600',
      localId: '60f8c1f7d9f1f9001f3d5d1',
      registered: true,
      displayName: 'test',
    },
  })
  token: FirebaseToken;
}
