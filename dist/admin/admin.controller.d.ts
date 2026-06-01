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
import { SiteContentService } from '../site-content/site-content.service';
import { UpdateSettingsDto } from '../site-content/dto/settings.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from '../site-content/dto/team-member.dto';
import { CreateClientDto, UpdateClientDto } from '../site-content/dto/client.dto';
import { CreateServiceDto, UpdateServiceDto } from '../site-content/dto/service.dto';
import { NewsletterService } from '../newsletter/newsletter.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { CreatePortfolioDto } from '../portfolio/dto/create-portfolio.dto';
import { UpdatePortfolioDto } from '../portfolio/dto/update-portfolio.dto';
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { UpdateArticleDto } from '../article/dto/update-article.dto';
import { UpdateAboutPageDto } from '../site-content/dto/about-page.dto';
export declare class AdminController {
    private readonly adminService;
    private readonly cooperationTypesService;
    private readonly jobApplicationsService;
    private readonly consultationService;
    private readonly siteContentService;
    private readonly newsletterService;
    private readonly portfolioService;
    private readonly categoriesService;
    private readonly articleService;
    constructor(adminService: AdminService, cooperationTypesService: CooperationTypesService, jobApplicationsService: JobApplicationsService, consultationService: ConsultationService, siteContentService: SiteContentService, newsletterService: NewsletterService, portfolioService: PortfolioService, categoriesService: CategoriesService, articleService: ArticleService);
    findAll(req: any): Promise<{
        createdAtJalali: string;
        username: string;
        password: string;
        fullName: string;
        role: AdminRole;
        isActive: boolean;
        status: AdminStatus;
        currentJti?: string;
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
        currentJti?: string;
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
    getSettings(): Promise<import("../site-content/schemas/settings.schema").Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateSettings(dto: UpdateSettingsDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getTeam(): Promise<(import("../site-content/schemas/team-member.schema").TeamMember & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createTeam(dto: CreateTeamMemberDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateTeam(id: string, dto: UpdateTeamMemberDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteTeam(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getClients(): Promise<(import("../site-content/schemas/client.schema").Client & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createClient(dto: CreateClientDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateClient(id: string, dto: UpdateClientDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteClient(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getServices(): Promise<(import("../site-content/schemas/service.schema").Service & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createService(dto: CreateServiceDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateService(id: string, dto: UpdateServiceDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteService(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getAboutPage(): Promise<import("../site-content/schemas/about-page.schema").AboutPage & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    upsertAboutPage(dto: UpdateAboutPageDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        page: import("mongoose").Document<unknown, {}, import("../site-content/schemas/about-page.schema").AboutPageDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../site-content/schemas/about-page.schema").AboutPage & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    deleteAboutPage(): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAllNewsletter(page?: string, limit?: string): Promise<{
        data: {
            _id: any;
            phoneNumber: any;
            createdAtJalali: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    removeNewsletter(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    createPortfolio(dto: CreatePortfolioDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    findAllPortfolio(): Promise<any[]>;
    findOnePortfolio(id: string): Promise<any>;
    updatePortfolio(id: string, dto: UpdatePortfolioDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    removePortfolio(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    createCategories(dto: CreateCategoryDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAllCategories(): Promise<(import("../categories/schemas/category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateCategories(id: string, dto: UpdateCategoryDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    removeCategories(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    createArticle(dto: CreateArticleDto, req: any): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
        slug: string;
    }>;
    findAllArticle(page?: string, limit?: string): Promise<{
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    updateArticle(id: string, dto: UpdateArticleDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    removeArticle(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
