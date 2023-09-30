import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/user-login.dto';
import * as argon from 'argon2';
import { genHash, generateSalt } from 'src/utils/helper';

@Injectable()
export class UserLogic {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async createUser(payload: CreateUserDto) {
    try {
      const findUser = await this.userService.findUserByEmail(payload.email);
      if (findUser) {
        throw new BadRequestException({
          error: 'USER_EMAIL_EXISTS',
          statusCode: 400,
          status: false,
          message: 'Sorry, user already exists.',
        });
      }

      const hash = await genHash(payload.password);

      const user = await this.userService.create({
        ...payload,
        password: hash,
      });

      const salt = await generateSalt();

      const token = await this.signToken(
        user.id as unknown as string,
        user.email,
      );

      console.log('it is here');

      return {
        message: 'REGISTRATION_SUCCESS',
        status: true,
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { access_token: token };
  }

  async login(payload: LoginUserDto) {
    // find the user by email
    const user = await this.userService.findUserByEmail(payload.email);
    // if user does not exist throw an exception
    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        statusCode: 400,
        status: false,
        message: 'Sorry, user not found',
      });
    }

    // compare password
    const passwordMatch = await argon.verify(user.password, payload.password);

    if (!passwordMatch) {
      throw new BadRequestException({
        status: false,
        message: "Sorry, you've entered an invalid password or email.",
        error: 'LOGIN_FAILURE',
      });
    }

    return {
      message: "Congratulations! You've successfully logged in.",
      status: true,
      token: await this.signToken(user.id as unknown as string, user.email),
    };
  }
}
