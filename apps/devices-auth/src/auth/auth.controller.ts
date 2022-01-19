import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { username, password } = signInDto;

    const isSignedIn = await this.authService.signIn(username, password);

    if (!isSignedIn) {
      throw new UnauthorizedException();
    }

    res.status(HttpStatus.OK).json({});
  }
}
