import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserDto } from '../users/dto/user/userDto';
import { AmbiensaUser } from 'src/users/models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post()
  async getUser(@Body() userDto: UserDto) {
    try {
      const user: Promise<AmbiensaUser> = this.authService.getUser(userDto);
      const accessToken = this.authService.login(await user);
      return [await accessToken];
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
