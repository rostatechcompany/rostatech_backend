"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const admin_schema_1 = require("./schemas/admin.schema");
const jalali_1 = require("../common/utils/jalali");
let AdminService = class AdminService {
    adminModel;
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async getAllAdmins(currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند لیست همه ادمین‌ها را ببیند');
        }
        const admins = await this.adminModel.find().select('-password -__v -createdAt -updatedAt').lean();
        return admins.map(admin => ({
            ...admin,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(admin._id.getTimestamp(), 'jYYYY/jMM/jDD'),
        }));
    }
    async getPendingAdmins(currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند لیست ادمین‌های در انتظار را ببیند');
        }
        const pendingAdmins = await this.adminModel.find({
            status: admin_schema_1.AdminStatus.PENDING
        }).select('-password -__v -createdAt -updatedAt').lean();
        return pendingAdmins.map(admin => ({
            ...admin,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(admin._id.getTimestamp(), 'jYYYY/jMM/jDD'),
        }));
    }
    async updateAdmin(id, updateAdminDto, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN && currentAdmin.userId !== id) {
            throw new common_1.ForbiddenException('شما فقط می‌توانید پروفایل خودتان را به‌روزرسانی کنید');
        }
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN && updateAdminDto.role) {
            delete updateAdminDto.role;
        }
        const admin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).select('-password');
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        return { message: { fa: 'ادمین با موفقیت اپدیت شد', en: 'Admin successfully updated' } };
    }
    async deleteAdmin(adminId, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند ادمین را حذف کند');
        }
        if (currentAdmin.userId === adminId) {
            throw new common_1.BadRequestException('نمیتوانید خودتان را حذف کنید');
        }
        const admin = await this.adminModel.findByIdAndDelete(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        return { message: { fa: 'ادمین با موفقیت حذف شد', en: 'Admin successfully removed' } };
    }
    async toggleActive(id, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Only super admin can toggle admin status');
        }
        const admin = await this.adminModel.findById(id);
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        admin.isActive = !admin.isActive;
        await admin.save();
        return { message: { fa: `ادمین با موفقیت ${admin.isActive ? 'فعال' : 'غیرفعال'} شد.`, en: `Admin ${admin.isActive ? 'activated' : 'deactivated'} successfully` } };
    }
    async approveAdmin(adminId, status, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند ادمین‌ها را تایید کند');
        }
        const admin = await this.adminModel.findById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        admin.status = status;
        await admin.save();
        return {
            message: status === admin_schema_1.AdminStatus.ACTIVE
                ? { fa: 'ادمین با موفقیت تایید شد', en: 'Admin successfully verified' }
                : { fa: 'ادمین رد شد', en: 'Admin denied' },
        };
    }
    async changeAdminRole(adminId, newRole, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند نقش ادمین‌ها را تغییر دهد');
        }
        if (currentAdmin.userId === adminId) {
            throw new common_1.BadRequestException('نمیتوانید نقش خودتان را تغییر دهید');
        }
        const admin = await this.adminModel.findById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        admin.role = newRole;
        await admin.save();
        return {
            message: { fa: `نقش ادمین به ${newRole === admin_schema_1.AdminRole.SUPER_ADMIN ? 'سوپر ادمین' : 'ادمین عادی'} تغییر یافت`,
                en: `Admin role changed to ${newRole === admin_schema_1.AdminRole.SUPER_ADMIN ? 'Super Admin' : 'Basic Admin'}` },
        };
    }
    async changeAdminPassword(adminId, changeAdminPasswordDto, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('فقط سوپر ادمین میتواند رمز عبور دیگران را تغییر دهد');
        }
        const admin = await this.adminModel.findById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        admin.password = await bcrypt.hash(changeAdminPasswordDto.newPassword, 12);
        await admin.save();
        return { message: { fa: 'رمز عبور ادمین با موفقیت تغییر یافت', en: 'Admin password changed successfully' } };
    }
    async changeUsername(adminId, newUsername, currentAdmin) {
        if (currentAdmin.role !== admin_schema_1.AdminRole.SUPER_ADMIN && currentAdmin.userId !== adminId) {
            throw new common_1.ForbiddenException('فقط میتوانید نام کاربری خودتان را تغییر دهید');
        }
        const existingAdmin = await this.adminModel.findOne({
            username: newUsername,
            _id: { $ne: adminId }
        });
        if (existingAdmin) {
            throw new common_1.ConflictException('این نام کاربری قبلا استفاده شده است');
        }
        const admin = await this.adminModel.findById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        admin.username = newUsername;
        await admin.save();
        return {
            message: { fa: 'نام کاربری با موفقیت تغییر یافت', en: 'Username changed successfully' },
            admin: {
                id: admin._id,
                username: admin.username,
            }
        };
    }
    async changeOwnPassword(adminId, changeOwnPasswordDto) {
        const admin = await this.adminModel.findById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('ادمین مورد نظر یافت نشد');
        }
        const isCurrentPasswordValid = await bcrypt.compare(changeOwnPasswordDto.currentPassword, admin.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('رمز عبور فعلی اشتباه است');
        }
        admin.password = await bcrypt.hash(changeOwnPasswordDto.newPassword, 12);
        await admin.save();
        return { message: { fa: 'رمز عبور با موفقیت تغییر یافت', en: 'Password changed successfully' } };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map