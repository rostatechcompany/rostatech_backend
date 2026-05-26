import { 
  Injectable, 
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument, AdminRole, AdminStatus } from '../admin/schemas/admin.schema';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  // Register new admin (anyone can register, but needs approval)
  async register(registerAdminDto: RegisterAdminDto) {
    // Check if username exists
    const existingAdmin = await this.adminModel.findOne({ 
      username: registerAdminDto.username 
    });
    
    if (existingAdmin) {
      throw new ConflictException('این نام کاربری قبلا ثبت شده است');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerAdminDto.password, 12);
    
    // Create admin with PENDING status
    await this.adminModel.create({
      ...registerAdminDto,
      password: hashedPassword,
      role: AdminRole.ADMIN,
      status: AdminStatus.PENDING,
    });

    return {
      message: {fa:'ثبت نام با موفقیت انجام شد. منتظر تایید سوپر ادمین باشید',
                en: 'Registration successful. Wait for Super Admin confirmation'},
    };
  }

  // Login
  async login(loginDto: LoginDto) {
    const admin = await this.adminModel.findOne({ 
      username: loginDto.username 
    });

    if (!admin) {
      throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');
    }

    // Check status
    if (admin.status === AdminStatus.PENDING) {
      throw new UnauthorizedException('حساب شما هنوز تایید نشده است');
    }

    if (admin.status === AdminStatus.REJECTED) {
      throw new UnauthorizedException('حساب شما رد شده است');
    }

    // Generate token
    const payload = {
      sub: admin._id,
      username: admin.username,
      role: admin.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin._id,
        username: admin.username,
        fullName: admin.fullName,
        role: admin.role,
      }
    };
  }
}