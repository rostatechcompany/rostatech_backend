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
let AdminController = class AdminController {
    adminService;
    cooperationTypesService;
    jobApplicationsService;
    consultationService;
    constructor(adminService, cooperationTypesService, jobApplicationsService, consultationService) {
        this.adminService = adminService;
        this.cooperationTypesService = cooperationTypesService;
        this.jobApplicationsService = jobApplicationsService;
        this.consultationService = consultationService;
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
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Management'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        cooperation_types_service_1.CooperationTypesService,
        job_applications_service_1.JobApplicationsService,
        consultation_service_1.ConsultationService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map