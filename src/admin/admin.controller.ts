import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeAdminPasswordDto} from './dto/change-admin-password.dto.ts';
import { ChangeOwnPasswordDto} from './dto/change-own-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminRole, AdminStatus} from './schemas/admin.schema';
import { ChangeRoleDto } from './dto/change-role.dto';

@ApiTags('Admin Management')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all admins (Super Admin only)' })
  findAll(@Request() req) {
    return this.adminService.getAllAdmins(req.user);
  }

  @Get('pending-admins')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View admins awaiting approval' })
  getPendingAdmins(@Request() req) {
    return this.adminService.getPendingAdmins(req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update admin' })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Request() req
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete admin (Super Admin only)' })
  remove(@Param('id') id: string, @Request() req) {
    return this.adminService.deleteAdmin(id, req.user);
  }

  @Put(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activate/Deactivate admin (Super Admin only)' })
  toggleActive(@Param('id') id: string, @Request() req) {
    return this.adminService.toggleActive(id, req.user);
  }

  @Put('approve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin Approval'})
  approveAdmin(@Param('id') id: string, @Request() req) {
    return this.adminService.approveAdmin(id, AdminStatus.ACTIVE, req.user);
  }

  @Put('reject/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin Reject' })
  rejectAdmin(@Param('id') id: string, @Request() req) {
    return this.adminService.approveAdmin(id, AdminStatus.REJECTED, req.user);
  }

  @Put('change-role/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change admin role (promote to super admin or demote)'})
  changeRole(
    @Param('id') id: string,
    @Body() changeRoleDto: ChangeRoleDto,
    @Request() req
  ) {
    return this.adminService.changeAdminRole(id, changeRoleDto.role, req.user);
  }

  // All Admins
  // ==================================================

  @Put('change-username/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change username'})
  changeUsername(
    @Param('id') id: string,
    @Body('username') username: string,
    @Request() req
  ) {
    return this.adminService.changeUsername(id, username, req.user);
  }

  @Put('change-my-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change my password'})
  changeMyPassword(
    @Request() req,
    @Body() changeOwnPasswordDto: ChangeOwnPasswordDto
  ) {
    return this.adminService.changeOwnPassword(req.user.userId, changeOwnPasswordDto);
  }

  @Put('change-admin-password/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Super admin change other admin's passwords" })
  changeUserPassword(
    @Param('id') id: string,
    @Body() changeAdminPasswordDto: ChangeAdminPasswordDto,
    @Request() req
  ) {
    return this.adminService.changeAdminPassword(id, changeAdminPasswordDto, req.user);
  }


}