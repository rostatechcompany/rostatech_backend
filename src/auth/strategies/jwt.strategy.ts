import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument, AdminStatus } from '../../admin/schemas/admin.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {
    const secretKey = configService.get<string>('JWT_SECRET');
    
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    const admin = await this.adminModel.findById(payload.sub);
    
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    
    if (admin.status !== AdminStatus.ACTIVE) {
      throw new UnauthorizedException('Admin account is not active');
    }
    
    return { 
      userId: admin._id.toString(), 
      username: admin.username, 
      role: admin.role,
      status: admin.status
    };
  }
}