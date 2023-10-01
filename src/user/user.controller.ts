import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserLogic } from './logic/user.logic';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private userLogic: UserLogic, private config: ConfigService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const request = await this.userLogic.createUser(createUserDto);

    // Setting the resposne for the route
    response.cookie('token', request.token.access_token, {
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return response.send(request);
  }

  @Post('/login')
  async login(@Body() loginPayload: LoginUserDto, @Res() response: Response) {
    const result = await this.userLogic.login(loginPayload);

    // Setting the resposne for the route
    response.cookie('token', result.token.access_token, {
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return response.send(result);
  }
}
