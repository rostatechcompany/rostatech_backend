import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto.ts';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { AdminRole, AdminStatus } from './schemas/admin.schema';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CreateCooperationTypeDto } from '../cooperation-types/dto/create-cooperation-type.dto';
import { UpdateCooperationTypeDto } from '../cooperation-types/dto/update-cooperation-type.dto';
import { CooperationTypesService } from '../cooperation-types/cooperation-types.service';
import { UpdateApplicationDto } from '../job-applications/dto/update-application.dto';
import { JobApplicationsService } from '../job-applications/job-applications.service';
import { UpdateConsultationDto } from '../consultation/dto/update-consultation.dto';
import { ConsultationService } from '../consultation/consultation.service';
export declare class AdminController {
    private readonly adminService;
    private readonly cooperationTypesService;
    private readonly jobApplicationsService;
    private readonly consultationService;
    constructor(adminService: AdminService, cooperationTypesService: CooperationTypesService, jobApplicationsService: JobApplicationsService, consultationService: ConsultationService);
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
    create(dto: CreateCooperationTypeDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAllCooperationType(): Promise<(import("../cooperation-types/schemas/cooperation-type.schema").CooperationType & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateCooperationType(id: string, dto: UpdateCooperationTypeDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    removeCooperationType(id: string): Promise<{
        message: string;
    }>;
    findAllJobReq(status?: string): Promise<{
        _id: any;
        fullName: any;
        phoneNumber: any;
        jobTitle: any;
        cooperationTypes: any;
        status: any;
        createdAtJalali: string;
    }[]>;
    findOneJobReq(id: string): Promise<any>;
    updateJobReq(id: string, updateDto: UpdateApplicationDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    removeJobReq(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAllConsultation(status?: string): Promise<{
        _id: any;
        fullName: any;
        phoneNumber: any;
        subject: any;
        status: any;
        createdAtJalali: string;
    }[]>;
    findOneConsultation(id: string): Promise<any>;
    updateConsultation(id: string, dto: UpdateConsultationDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    removeConsultation(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
