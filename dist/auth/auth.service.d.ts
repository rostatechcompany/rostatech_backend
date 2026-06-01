import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument, AdminRole } from '../admin/schemas/admin.schema';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private adminModel;
    private jwtService;
    private configService;
    constructor(adminModel: Model<AdminDocument>, jwtService: JwtService, configService: ConfigService);
    initSuperAdmin(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    register(registerAdminDto: RegisterAdminDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        expiresAt: string;
        admin: {
            id: import("mongoose").Types.ObjectId;
            username: string;
            fullName: string;
            role: AdminRole;
        };
    }>;
    logout(adminId: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
