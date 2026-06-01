import { 
  Injectable, 
  ConflictException, 
  NotFoundException,
  ForbiddenException,
  BadRequestException ,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument, AdminRole, AdminStatus} from './schemas/admin.schema';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { ChangeAdminPasswordDto} from './dto/change-admin-password.dto.ts';
import { JalaliDateUtil } from '../common/utils/jalali';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  // Super admin routes
  // ==========================================================
  // Get all admins
  async getAllAdmins(currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند لیست همه ادمین‌ها را ببیند');
    }

    const admins = await this.adminModel.find().select('-password -__v -createdAt -updatedAt').lean();
    return admins.map(admin => ({
      ...admin,
      createdAtJalali: JalaliDateUtil.toJalali(admin._id.getTimestamp(), 'jYYYY/jMM/jDD'),
    }));
  }

  // Get all pending admins
  async getPendingAdmins(currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند لیست ادمین‌های در انتظار را ببیند');
    }

    const pendingAdmins = await this.adminModel.find({ 
      status: AdminStatus.PENDING 
    }).select('-password -__v -createdAt -updatedAt').lean();

    // return pendingAdmins;
    return pendingAdmins.map(admin => ({
      ...admin,
      createdAtJalali: JalaliDateUtil.toJalali(admin._id.getTimestamp(), 'jYYYY/jMM/jDD'),
    }));
  }

  // update admins 
  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN && currentAdmin.userId !== id) {
      throw new ForbiddenException('شما فقط می‌توانید پروفایل خودتان را به‌روزرسانی کنید');
    }

    // Prevent changing role if not super admin
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN && updateAdminDto.role) {
      delete updateAdminDto.role;
    }

    const admin = await this.adminModel.findByIdAndUpdate(
      id,
      updateAdminDto,
      { new: true }
    ).select('-password');

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    // return admin;
    return { message: {fa:'ادمین با موفقیت اپدیت شد', en: 'Admin successfully updated'}};
  }

  // delete admin
  async deleteAdmin(adminId: string, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند ادمین را حذف کند');
    }

    if (currentAdmin.userId === adminId) {
      throw new BadRequestException('نمیتوانید خودتان را حذف کنید');
    }

    const admin = await this.adminModel.findByIdAndDelete(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    return { message: {fa:'ادمین با موفقیت حذف شد', en: 'Admin successfully removed'}};
  }

  // active or deactivate admin 
  async toggleActive(id: string, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Only super admin can toggle admin status');
    }

    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    admin.isActive = !admin.isActive;
    await admin.save();

    return { message: {fa: `ادمین با موفقیت ${admin.isActive ? 'فعال' : 'غیرفعال'} شد.`, en:`Admin ${admin.isActive ? 'activated' : 'deactivated'} successfully`}};
  }

  // Approve or reject admin registration
  async approveAdmin(adminId: string, status: AdminStatus, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند ادمین‌ها را تایید کند');
    }

    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    admin.status = status;
    await admin.save();

    return {
      message: status === AdminStatus.ACTIVE 
        ? {fa:'ادمین با موفقیت تایید شد', en: 'Admin successfully verified'} 
        : {fa:'ادمین رد شد', en:'Admin denied'},
    };
  }

  // Change admin role (promote to super admin or demote)
  async changeAdminRole(adminId: string, newRole: AdminRole, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند نقش ادمین‌ها را تغییر دهد');
    }

    if (currentAdmin.userId === adminId) {
      throw new BadRequestException('نمیتوانید نقش خودتان را تغییر دهید');
    }

    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    admin.role = newRole;
    await admin.save();

    return {
      message: {fa: `نقش ادمین به ${newRole === AdminRole.SUPER_ADMIN ? 'سوپر ادمین' : 'ادمین عادی'} تغییر یافت`, 
                en: `Admin role changed to ${newRole === AdminRole.SUPER_ADMIN ? 'Super Admin' : 'Basic Admin'}`},
    };
  }

  // Change other admin password
  async changeAdminPassword(adminId: string, changeAdminPasswordDto: ChangeAdminPasswordDto, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('فقط سوپر ادمین میتواند رمز عبور دیگران را تغییر دهد');
    }

    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    admin.password = await bcrypt.hash(changeAdminPasswordDto.newPassword, 12);
    await admin.save();

    return { message: {fa:'رمز عبور ادمین با موفقیت تغییر یافت', en:'Admin password changed successfully'} };
  }

  // all admins
  // =======================================================

  // Change username (Admin can only change their own username)
  async changeUsername(adminId: string, newUsername: string, currentAdmin: any) {
    if (currentAdmin.role !== AdminRole.SUPER_ADMIN && currentAdmin.userId !== adminId) {
      throw new ForbiddenException('فقط میتوانید نام کاربری خودتان را تغییر دهید');
    }

    // Check if new username already exists
    const existingAdmin = await this.adminModel.findOne({ 
      username: newUsername,
      _id: { $ne: adminId }
    });
    
    if (existingAdmin) {
      throw new ConflictException('این نام کاربری قبلا استفاده شده است');
    }

    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    admin.username = newUsername;
    await admin.save();

    return {
      message: {fa:'نام کاربری با موفقیت تغییر یافت', en: 'Username changed successfully'},
      admin: {
        id: admin._id,
        username: admin.username,
      }
    };
  }

  // Change own password
  async changeOwnPassword(adminId: string, changeOwnPasswordDto: ChangeOwnPasswordDto) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('ادمین مورد نظر یافت نشد');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changeOwnPasswordDto.currentPassword,
      admin.password
    );
    
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('رمز عبور فعلی اشتباه است');
    }

    admin.password = await bcrypt.hash(changeOwnPasswordDto.newPassword, 12);
    await admin.save();

    return { message: {fa:'رمز عبور با موفقیت تغییر یافت', en: 'Password changed successfully'}};
  }
}