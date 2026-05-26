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
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
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
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Management'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map