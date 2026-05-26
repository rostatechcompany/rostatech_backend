import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { AdminDocument, AdminRole, AdminStatus } from './schemas/admin.schema';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto.ts';
export declare class AdminService implements OnModuleInit {
    private adminModel;
    constructor(adminModel: Model<AdminDocument>);
    onModuleInit(): Promise<void>;
    getAllAdmins(currentAdmin: any): Promise<{
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
    getPendingAdmins(currentAdmin: any): Promise<{
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
    updateAdmin(id: string, updateAdminDto: UpdateAdminDto, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteAdmin(adminId: string, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    toggleActive(id: string, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    approveAdmin(adminId: string, status: AdminStatus, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeAdminRole(adminId: string, newRole: AdminRole, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeAdminPassword(adminId: string, changeAdminPasswordDto: ChangeAdminPasswordDto, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    changeUsername(adminId: string, newUsername: string, currentAdmin: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
        admin: {
            id: import("mongoose").Types.ObjectId;
            username: string;
        };
    }>;
    changeOwnPassword(adminId: string, changeOwnPasswordDto: ChangeOwnPasswordDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
