import { 
  Controller, 
  Post,
  Body, 
  UseGuards, 
  Request
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'logout' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }
}