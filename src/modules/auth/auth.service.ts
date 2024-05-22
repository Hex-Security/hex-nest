import { ConflictException, Injectable } from '@nestjs/common';
import {
  AuthenticationClient,
  JSONApiResponse,
  ManagementClient,
  SignUpResponse,
} from 'auth0';
import axios from 'axios';
import { User } from '../entity/entities/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  /**Auth0 Management client is meant to be used
   * to perform administrative tasks */
  private auth0_admin_management_client: ManagementClient;
  /** The Authentication client enables you to manage all aspects of user identity when you use Auth0ManagementService (og in, sign up, log out and more) */
  private auth0_client: AuthenticationClient;

  async onModuleInit() {
    try {
      if (!this.auth0_admin_management_client) {
        // get token from auth service
        const { access_token } = await this.getSystemToken();

        this.auth0_admin_management_client = new ManagementClient({
          domain: process.env.AUTH0_DOMAIN,
          audience: process.env.AUTH0_AUDIENCE,
          token: access_token,
        });
      }

      if (!this.auth0_client) {
        this.auth0_client = new AuthenticationClient({
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private getAdminManagementClient(): ManagementClient {
    return this.auth0_admin_management_client;
  }

  private getAuthClient(): AuthenticationClient {
    return this.auth0_client;
  }

  constructor(private readonly user_service: UserService) {}

  async signUp(dto: RegisterDto): Promise<User> {
    const { email, password, first_name, last_name, phone, username } = dto;

    // 1. Validate if user already exists
    if (await this.user_service.findByEmail(email)) {
      throw new ConflictException('User already exists');
    }

    // 2. Create user in Auth0
    const auth0_res: JSONApiResponse<SignUpResponse> =
      await this.getAuthClient().database.signUp({
        email,
        password,
        name: first_name,
        family_name: last_name,
        connection: 'Username-Password-Authentication',
        username,
      });

    const auth0_user: SignUpResponse = auth0_res.data;

    // 3. Create user on our DB
    const user: User = await this.user_service.create(dto);

    return user;
  }

  async getSystemToken() {
    var options = {
      method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
      }),
    };

    try {
      const response = await axios.request(options);
      console.log('[INFO] Auth0 Token was retrieved successfully.');
      return response.data as TokenDto;
    } catch (error) {
      console.error('Error obtaining token:', error);
      return null;
    }
  }
}
