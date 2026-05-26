import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument, AdminRole } from '../admin/schemas/admin.schema';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private adminModel;
    private jwtService;
    constructor(adminModel: Model<AdminDocument>, jwtService: JwtService);
    register(registerAdminDto: RegisterAdminDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: import("mongoose").Types.ObjectId;
            username: string;
            fullName: string;
            role: AdminRole;
        };
    }>;
}
