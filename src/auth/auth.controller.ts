import { 
  Controller, 
  Post,
  Body, 
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('init-superadmin')
  @ApiOperation({ summary: "create super admin" })
  async initSuperAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.initSuperAdmin(dto);
  }
  
  @Post('register')
  @ApiOperation({ summary: 'New admin registration (requires super admin approval)' })
  register(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.register(registerAdminDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin Login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}