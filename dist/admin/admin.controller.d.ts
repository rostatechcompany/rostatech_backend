import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto.ts';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { AdminRole, AdminStatus } from './schemas/admin.schema';
import { ChangeRoleDto } from './dto/change-role.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(req: any): Promise<{
        createdAtJalali: string;
        username: string;
        password: string;
        fullName: string;
        role: AdminRole;
        isActive: boolean;
        status: AdminStatus;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    getPendingAdmins(req: any): Promise<{
        createdAtJalali: string;
        username: string;
        password: string;
        fullName: string;
        role: AdminRole;
        isActive: boolean;
        status: AdminStatus;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    update(id: string, updateAdminDto: UpdateAdminDto, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    remove(id: string, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    toggleActive(id: string, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    approveAdmin(id: string, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    rejectAdmin(id: string, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeRole(id: string, changeRoleDto: ChangeRoleDto, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeUsername(id: string, username: string, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
        admin: {
            id: import("mongoose").Types.ObjectId;
            username: string;
        };
    }>;
    changeMyPassword(req: any, changeOwnPasswordDto: ChangeOwnPasswordDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeUserPassword(id: string, changeAdminPasswordDto: ChangeAdminPasswordDto, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
