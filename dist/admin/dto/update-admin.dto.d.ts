import { AdminRole } from '../schemas/admin.schema';
export declare class UpdateAdminDto {
    username?: string;
    fullName?: string;
    role?: AdminRole;
    isActive?: boolean;
}
