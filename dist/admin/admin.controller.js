"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const admin_service_1 = require("./admin.service");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const change_admin_password_dto_ts_1 = require("./dto/change-admin-password.dto.ts");
const change_own_password_dto_1 = require("./dto/change-own-password.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const admin_schema_1 = require("./schemas/admin.schema");
const change_role_dto_1 = require("./dto/change-role.dto");
const create_cooperation_type_dto_1 = require("../cooperation-types/dto/create-cooperation-type.dto");
const update_cooperation_type_dto_1 = require("../cooperation-types/dto/update-cooperation-type.dto");
const cooperation_types_service_1 = require("../cooperation-types/cooperation-types.service");
const update_application_dto_1 = require("../job-applications/dto/update-application.dto");
const job_applications_service_1 = require("../job-applications/job-applications.service");
const update_consultation_dto_1 = require("../consultation/dto/update-consultation.dto");
const consultation_service_1 = require("../consultation/consultation.service");
const site_content_service_1 = require("../site-content/site-content.service");
const settings_dto_1 = require("../site-content/dto/settings.dto");
const team_member_dto_1 = require("../site-content/dto/team-member.dto");
const client_dto_1 = require("../site-content/dto/client.dto");
const service_dto_1 = require("../site-content/dto/service.dto");
const newsletter_service_1 = require("../newsletter/newsletter.service");
const portfolio_service_1 = require("../portfolio/portfolio.service");
const create_portfolio_dto_1 = require("../portfolio/dto/create-portfolio.dto");
const update_portfolio_dto_1 = require("../portfolio/dto/update-portfolio.dto");
const upload_service_1 = require("../upload/upload.service");
const upload_dto_1 = require("../upload/dto/upload.dto");
const categories_service_1 = require("../categories/categories.service");
const create_category_dto_1 = require("../categories/dto/create-category.dto");
const update_category_dto_1 = require("../categories/dto/update-category.dto");
const article_service_1 = require("../article/article.service");
const create_article_dto_1 = require("../article/dto/create-article.dto");
const update_article_dto_1 = require("../article/dto/update-article.dto");
let AdminController = class AdminController {
    adminService;
    cooperationTypesService;
    jobApplicationsService;
    consultationService;
    siteContentService;
    newsletterService;
    portfolioService;
    uploadService;
    categoriesService;
    articleService;
    constructor(adminService, cooperationTypesService, jobApplicationsService, consultationService, siteContentService, newsletterService, portfolioService, uploadService, categoriesService, articleService) {
        this.adminService = adminService;
        this.cooperationTypesService = cooperationTypesService;
        this.jobApplicationsService = jobApplicationsService;
        this.consultationService = consultationService;
        this.siteContentService = siteContentService;
        this.newsletterService = newsletterService;
        this.portfolioService = portfolioService;
        this.uploadService = uploadService;
        this.categoriesService = categoriesService;
        this.articleService = articleService;
    }
    findAll(req) {
        return this.adminService.getAllAdmins(req.user);
    }
    getPendingAdmins(req) {
        return this.adminService.getPendingAdmins(req.user);
    }
    update(id, updateAdminDto, req) {
        return this.adminService.updateAdmin(id, updateAdminDto, req.user);
    }
    remove(id, req) {
        return this.adminService.deleteAdmin(id, req.user);
    }
    toggleActive(id, req) {
        return this.adminService.toggleActive(id, req.user);
    }
    approveAdmin(id, req) {
        return this.adminService.approveAdmin(id, admin_schema_1.AdminStatus.ACTIVE, req.user);
    }
    rejectAdmin(id, req) {
        return this.adminService.approveAdmin(id, admin_schema_1.AdminStatus.REJECTED, req.user);
    }
    changeRole(id, changeRoleDto, req) {
        return this.adminService.changeAdminRole(id, changeRoleDto.role, req.user);
    }
    changeUsername(id, username, req) {
        return this.adminService.changeUsername(id, username, req.user);
    }
    changeMyPassword(req, changeOwnPasswordDto) {
        return this.adminService.changeOwnPassword(req.user.userId, changeOwnPasswordDto);
    }
    changeUserPassword(id, changeAdminPasswordDto, req) {
        return this.adminService.changeAdminPassword(id, changeAdminPasswordDto, req.user);
    }
    create(dto) {
        return this.cooperationTypesService.create(dto);
    }
    findAllCooperationType() {
        return this.cooperationTypesService.findAll();
    }
    updateCooperationType(id, dto) {
        return this.cooperationTypesService.update(id, dto);
    }
    removeCooperationType(id) {
        return this.cooperationTypesService.remove(id);
    }
    findAllJobReq(status) {
        return this.jobApplicationsService.findAll(status);
    }
    findOneJobReq(id) {
        return this.jobApplicationsService.findOne(id);
    }
    updateJobReq(id, updateDto) {
        return this.jobApplicationsService.update(id, updateDto);
    }
    removeJobReq(id) {
        return this.jobApplicationsService.remove(id);
    }
    findAllConsultation(status) {
        return this.consultationService.findAll(status);
    }
    findOneConsultation(id) {
        return this.consultationService.findOne(id);
    }
    updateConsultation(id, dto) {
        return this.consultationService.update(id, dto);
    }
    removeConsultation(id) {
        return this.consultationService.remove(id);
    }
    getSettings() {
        return this.siteContentService.getSettings();
    }
    updateSettings(dto) {
        return this.siteContentService.updateSettings(dto);
    }
    getTeam() {
        return this.siteContentService.getTeam();
    }
    createTeam(dto) {
        return this.siteContentService.createTeamMember(dto);
    }
    updateTeam(id, dto) {
        return this.siteContentService.updateTeamMember(id, dto);
    }
    deleteTeam(id) {
        return this.siteContentService.deleteTeamMember(id);
    }
    getClients() {
        return this.siteContentService.getClients();
    }
    createClient(dto) {
        return this.siteContentService.createClient(dto);
    }
    updateClient(id, dto) {
        return this.siteContentService.updateClient(id, dto);
    }
    deleteClient(id) {
        return this.siteContentService.deleteClient(id);
    }
    getServices() {
        return this.siteContentService.getServices();
    }
    createService(dto) {
        return this.siteContentService.createService(dto);
    }
    updateService(id, dto) {
        return this.siteContentService.updateService(id, dto);
    }
    deleteService(id) {
        return this.siteContentService.deleteService(id);
    }
    findAllNewsletter(page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 10;
        return this.newsletterService.findAll(p, l);
    }
    removeNewsletter(id) {
        return this.newsletterService.remove(id);
    }
    createPortfolio(dto) {
        return this.portfolioService.create(dto);
    }
    findAllPortfolio() {
        return this.portfolioService.findAllAdmin();
    }
    findOnePortfolio(id) {
        return this.portfolioService.findOneAdmin(id);
    }
    updatePortfolio(id, dto) {
        return this.portfolioService.update(id, dto);
    }
    removePortfolio(id) {
        return this.portfolioService.remove(id);
    }
    async uploadImage(file, folder) {
        const subFolder = folder || 'general';
        const url = await this.uploadService.uploadImage(file, subFolder);
        return {
            success: true,
            data: { url },
            message: { fa: 'تصویر با موفقیت آپلود شد', en: 'Image uploaded successfully' },
        };
    }
    async deleteImage(url) {
        await this.uploadService.deleteImage(url);
        return {
            success: true,
            message: { fa: 'تصویر با موفقیت حذف شد', en: 'Image deleted successfully' },
        };
    }
    createCategories(dto) { return this.categoriesService.create(dto); }
    findAllCategories() { return this.categoriesService.findAll(); }
    updateCategories(id, dto) { return this.categoriesService.update(id, dto); }
    removeCategories(id) { return this.categoriesService.remove(id); }
    createArticle(dto, req) {
        return this.articleService.create(dto, req.user.userId);
    }
    findAllArticle(page, limit) {
        return this.articleService.findAllAdmin(+(page || 1), +(limit || 10));
    }
    findOne(id) { return this.articleService.findOneAdmin(id); }
    updateArticle(id, dto) {
        return this.articleService.update(id, dto);
    }
    removeArticle(id) { return this.articleService.remove(id); }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all admins (Super Admin only)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending-admins'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'View admins awaiting approval' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingAdmins", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update admin' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete admin (Super Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/toggle-active'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Activate/Deactivate admin (Super Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Put)('approve/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin Approval' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveAdmin", null);
__decorate([
    (0, common_1.Put)('reject/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin Reject' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "rejectAdmin", null);
__decorate([
    (0, common_1.Put)('change-role/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Change admin role (promote to super admin or demote)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_role_dto_1.ChangeRoleDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeRole", null);
__decorate([
    (0, common_1.Put)('change-username/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Change username' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeUsername", null);
__decorate([
    (0, common_1.Put)('change-my-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Change my password' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_own_password_dto_1.ChangeOwnPasswordDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeMyPassword", null);
__decorate([
    (0, common_1.Put)('change-admin-password/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Super admin change other admin's passwords" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_admin_password_dto_ts_1.ChangeAdminPasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeUserPassword", null);
__decorate([
    (0, common_1.Post)('cooperation-type'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cooperation_type_dto_1.CreateCooperationTypeDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('cooperation-type'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllCooperationType", null);
__decorate([
    (0, common_1.Put)('cooperation-type/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cooperation_type_dto_1.UpdateCooperationTypeDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCooperationType", null);
__decorate([
    (0, common_1.Delete)('cooperation-type/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeCooperationType", null);
__decorate([
    (0, common_1.Get)('job-applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['pending', 'accepted', 'rejected'] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllJobReq", null);
__decorate([
    (0, common_1.Get)('job-applications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOneJobReq", null);
__decorate([
    (0, common_1.Put)('job-applications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateJobReq", null);
__decorate([
    (0, common_1.Delete)('job-applications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeJobReq", null);
__decorate([
    (0, common_1.Get)('consultation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['pending', 'answered', 'closed'] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllConsultation", null);
__decorate([
    (0, common_1.Get)('consultation/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOneConsultation", null);
__decorate([
    (0, common_1.Put)('consultation/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_dto_1.UpdateConsultationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateConsultation", null);
__decorate([
    (0, common_1.Delete)('consultation/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeConsultation", null);
__decorate([
    (0, common_1.Get)('site-content/settings'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)('site-content/settings'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.UpdateSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)('site-content/team'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Post)('site-content/team'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_dto_1.CreateTeamMemberDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Put)('site-content/team/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, team_member_dto_1.UpdateTeamMemberDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTeam", null);
__decorate([
    (0, common_1.Delete)('site-content/team/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteTeam", null);
__decorate([
    (0, common_1.Get)('site-content/clients'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getClients", null);
__decorate([
    (0, common_1.Post)('site-content/clients'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createClient", null);
__decorate([
    (0, common_1.Put)('site-content/clients/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Delete)('site-content/clients/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Get)('site-content/services'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getServices", null);
__decorate([
    (0, common_1.Post)('site-content/services'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)('site-content/services/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)('site-content/services/:id'),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)('newsletter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllNewsletter", null);
__decorate([
    (0, common_1.Delete)('newsletter/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeNewsletter", null);
__decorate([
    (0, common_1.Post)('portfolio'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.CreatePortfolioDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createPortfolio", null);
__decorate([
    (0, common_1.Get)('portfolio'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllPortfolio", null);
__decorate([
    (0, common_1.Get)('portfolio/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOnePortfolio", null);
__decorate([
    (0, common_1.Put)('portfolio/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_portfolio_dto_1.UpdatePortfolioDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePortfolio", null);
__decorate([
    (0, common_1.Delete)('portfolio/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removePortfolio", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_dto_1.UploadImageDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Delete)('image'),
    (0, swagger_1.ApiBody)({ type: upload_dto_1.DeleteImageDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createCategories", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCategories", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeCategories", null);
__decorate([
    (0, common_1.Post)('article'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Get)('articles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllArticle", null);
__decorate([
    (0, common_1.Get)('articles/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('articles/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)('articles/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.ADMIN, admin_schema_1.AdminRole.SUPER_ADMIN),
    (0, roles_decorator_1.Roles)(admin_schema_1.AdminRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeArticle", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Management'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        cooperation_types_service_1.CooperationTypesService,
        job_applications_service_1.JobApplicationsService,
        consultation_service_1.ConsultationService,
        site_content_service_1.SiteContentService,
        newsletter_service_1.NewsletterService,
        portfolio_service_1.PortfolioService,
        upload_service_1.UploadService,
        categories_service_1.CategoriesService,
        article_service_1.ArticleService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map