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
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    // Setting the resposne for the route
    // response.cookie('token', 'abdullah', {
    //   domain: this.config.get('COOKIE_DOMAIN'),
    //   path: '/',
    //   secure: false,
    //   httpOnly: true,
    //   sameSite: false,
    // });
    return this.userLogic.createUser(createUserDto);
  }

  @Post('/login')
  login(@Body() loginPayload: LoginUserDto, @Res() response: Response) {
    // Setting the resposne for the route
    response.cookie('token', 'abdullah', {
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return this.userLogic.login(loginPayload);
  }
}
