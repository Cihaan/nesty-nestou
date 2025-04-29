import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginUserDto);
  }
}
