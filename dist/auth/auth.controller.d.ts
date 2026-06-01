import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import("../admin/schemas/admin.schema").AdminRole;
        };
    }>;
    logout(req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
