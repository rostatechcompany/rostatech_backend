import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import("../admin/schemas/admin.schema").AdminRole;
        };
    }>;
}
