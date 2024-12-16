import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  currentUser,
} from '@app/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @currentUser() user: UserDocument,
    @Res({ passthrough: true }) resposne: Response,
  ) {
    await this.authService.login(user, resposne);
    resposne.send(user);
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
      id: data.user._id,
    };
  }
}
