import { Injectable } from '@nestjs/common';
import { UserDocument } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );

    const accessToken = await this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires,
    });

    return accessToken;
  }
}
