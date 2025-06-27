import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseCodes } from 'src/common/constanst/response-code';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(ResponseCodes.SUCCESS.OK)
  @Post('login')
  async loginUser(@Body() dto: LoginAuthDto): Promise<ResponseTypedApis> {
    return await this.authService.login(dto);
  }
}
