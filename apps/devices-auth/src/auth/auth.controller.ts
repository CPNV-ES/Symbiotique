import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('BROKER') private readonly client: ClientProxy,
  ) {}

  @MessagePattern('v1/devices-auth/request-credentials')
  async requestCredentials() {
    const credentials = await this.authService.findOne();

    this.client.emit(
      'v1/devices-auth/credentials',
      JSON.stringify(credentials),
    );
  }
}
