import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeAdminPasswordDto} from './dto/change-admin-password.dto.ts';
import { ChangeOwnPasswordDto} from './dto/change-own-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminRole, AdminStatus} from './schemas/admin.schema';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CreateCooperationTypeDto } from '../cooperation-types/dto/create-cooperation-type.dto';
import { UpdateCooperationTypeDto } from '../cooperation-types/dto/update-cooperation-type.dto';
import { CooperationTypesService} from '../cooperation-types/cooperation-types.service';
import { UpdateApplicationDto } from '../job-applications/dto/update-application.dto';
import { JobApplicationsService} from '../job-applications/job-applications.service';
import { UpdateConsultationDto } from '../consultation/dto/update-consultation.dto';
import { ConsultationService } from '../consultation/consultation.service';
import { SiteContentService} from '../site-content/site-content.service';
import { UpdateSettingsDto } from '../site-content/dto/settings.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from '../site-content/dto/team-member.dto';
import { CreateClientDto, UpdateClientDto } from '../site-content/dto/client.dto';
import { CreateServiceDto, UpdateServiceDto } from '../site-content/dto/service.dto';
import { NewsletterService} from '../newsletter/newsletter.service';
import { PortfolioService} from '../portfolio/portfolio.service';
import { CreatePortfolioDto } from '../portfolio/dto/create-portfolio.dto';
import { UpdatePortfolioDto } from '../portfolio/dto/update-portfolio.dto';
import { CategoriesService}from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { UpdateArticleDto } from '../article/dto/update-article.dto';
import { UpdateAboutPageDto} from '../site-content/dto/about-page.dto';

@ApiTags('Admin Management')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
              private readonly cooperationTypesService:CooperationTypesService, 
              private readonly jobApplicationsService: JobApplicationsService,
              private readonly consultationService: ConsultationService,
              private readonly siteContentService: SiteContentService,
              private readonly newsletterService: NewsletterService,
              private readonly portfolioService: PortfolioService,
              private readonly categoriesService: CategoriesService,
              private readonly articleService: ArticleService,
  ) {}

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
  @Roles(AdminRole.SUPER_ADMIN)
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

  // for cooperation type
  // ========================================================

  // create
  @Post('cooperation-type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  create(@Body() dto: CreateCooperationTypeDto) {
    return this.cooperationTypesService.create(dto);
  }

  // list
  @Get('cooperation-type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findAllCooperationType() {
    return this.cooperationTypesService.findAll();
  }

  // edit
  @Put('cooperation-type/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateCooperationType(@Param('id') id: string, @Body() dto: UpdateCooperationTypeDto) {
    return this.cooperationTypesService.update(id, dto);
  }

  // delete
  @Delete('cooperation-type/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  removeCooperationType(@Param('id') id: string) {
    return this.cooperationTypesService.remove(id);
  }

  // for job applications 
  // ==========================================
  
  // list
  @Get('job-applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'accepted', 'rejected'] })
  findAllJobReq(@Query('status') status?: string) {
    return this.jobApplicationsService.findAll(status);
  }

  // detailed
  @Get('job-applications/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findOneJobReq(@Param('id') id: string) {
    return this.jobApplicationsService.findOne(id);
  }

  // update status / note
  @Put('job-applications/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateJobReq(@Param('id') id: string, @Body() updateDto: UpdateApplicationDto) {
    return this.jobApplicationsService.update(id, updateDto);
  }

  // delete
  @Delete('job-applications/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN )
  @ApiBearerAuth()
  removeJobReq(@Param('id') id: string) {
    return this.jobApplicationsService.remove(id);
  }

  // for consultation
  // -----------------------------------------------
  // list
  @Get('consultation')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'answered', 'closed'] })
  findAllConsultation(@Query('status') status?: string) {
    return this.consultationService.findAll(status);
  }

  // detailed
  @Get('consultation/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findOneConsultation(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  // change status and add note
  @Put('consultation/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateConsultation(@Param('id') id: string, @Body() dto: UpdateConsultationDto) {
    return this.consultationService.update(id, dto);
  }

  // delete
  @Delete('consultation/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  removeConsultation(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }

  // for site content
  // =================================================

  // Settings
  @Get('site-content/settings')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getSettings() {
    return this.siteContentService.getSettings();
  }

  @Put('site-content/settings')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.siteContentService.updateSettings(dto);
  }

  // Team
  @Get('site-content/team')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getTeam() {
    return this.siteContentService.getTeam();
  }

  @Post('site-content/team')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  createTeam(@Body() dto: CreateTeamMemberDto) {
    return this.siteContentService.createTeamMember(dto);
  }

  @Put('site-content/team/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateTeam(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.siteContentService.updateTeamMember(id, dto);
  }

  @Delete('site-content/team/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  deleteTeam(@Param('id') id: string) {
    return this.siteContentService.deleteTeamMember(id);
  }

  // Clients
  @Get('site-content/clients')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getClients() {
    return this.siteContentService.getClients();
  }

  @Post('site-content/clients')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  createClient(@Body() dto: CreateClientDto) {
    return this.siteContentService.createClient(dto);
  }

  @Put('site-content/clients/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.siteContentService.updateClient(id, dto);
  }

  @Delete('site-content/clients/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  deleteClient(@Param('id') id: string) {
    return this.siteContentService.deleteClient(id);
  }

  // Services
  @Get('site-content/services')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getServices() {
    return this.siteContentService.getServices();
  }

  @Post('site-content/services')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  createService(@Body() dto: CreateServiceDto) {
    return this.siteContentService.createService(dto);
  }

  @Put('site-content/services/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.siteContentService.updateService(id, dto);
  }

  @Delete('site-content/services/:id')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  deleteService(@Param('id') id: string) {
    return this.siteContentService.deleteService(id);
  }

  //  About page
  @Get('about')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getAboutPage() {
    return this.siteContentService.getAboutPagePublic();
  }

  @Put('about')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  upsertAboutPage(@Body() dto: UpdateAboutPageDto) {
    return this.siteContentService.upsertAboutPage(dto);
  }

  @Delete('about')
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  deleteAboutPage() {
    return this.siteContentService.deleteAboutPage();
  }


  // for newsletter
  // ============================
  // list
  @Get('newsletter')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAllNewsletter(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 10;
    return this.newsletterService.findAll(p, l);
  }

  // delete
  @Delete('newsletter/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiBearerAuth()
  removeNewsletter(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }

  // for portfolio
  // ======================================
  
  @Post('portfolio')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  createPortfolio(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Get('portfolio')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  findAllPortfolio() {
    return this.portfolioService.findAllAdmin();
  }

  @Get('portfolio/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  findOnePortfolio(@Param('id') id: string) {
    return this.portfolioService.findOneAdmin(id);
  }

  @Put('portfolio/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  updatePortfolio(@Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
    return this.portfolioService.update(id, dto);
  }

  @Delete('portfolio/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  removePortfolio(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }

  // // for upload
  // // ===================================

  // @Post('image')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: UploadImageDto })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  // async uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('folder') folder?: string,
  // ) {
  //   const subFolder = folder || 'general';
  //   const url = await this.uploadService.uploadImage(file, subFolder);
  //   return {
  //     success: true,
  //     data: { url },
  //     message: { fa: 'تصویر با موفقیت آپلود شد', en: 'Image uploaded successfully' },
  //   };
  // }

  // @Delete('image')
  // @ApiBody({ type: DeleteImageDto })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  // async deleteImage(@Body('url') url: string) {
  //   await this.uploadService.deleteImage(url);
  //   return {
  //     success: true,
  //     message: { fa: 'تصویر با موفقیت حذف شد', en: 'Image deleted successfully' },
  //   };
  // }

  // for categories 
  // =======================================
  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  createCategories(@Body() dto: CreateCategoryDto) { return this.categoriesService.create(dto); }

  @Get('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  findAllCategories() { return this.categoriesService.findAll(); }
  
  @Put('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  updateCategories(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.categoriesService.update(id, dto); }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  removeCategories(@Param('id') id: string) { return this.categoriesService.remove(id); }

  // for articles
  // ===================================
  @Post('article')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  createArticle(@Body() dto: CreateArticleDto, @Request() req: any) {
    return this.articleService.create(dto, req.user.userId);
  }

  @Get('articles')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAllArticle(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.articleService.findAllAdmin(+(page || 1), +(limit || 10));
  }

  @Get('articles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  findOne(@Param('id') id: string) { return this.articleService.findOneAdmin(id); }

  @Put('articles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articleService.update(id, dto);
  }

  @Delete('articles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  @Roles(AdminRole.SUPER_ADMIN)
  removeArticle(@Param('id') id: string) { return this.articleService.remove(id); }
}