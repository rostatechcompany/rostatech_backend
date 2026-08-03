import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { CooperationTypesModule} from '../cooperation-types/cooperation-types.module';
import { JobApplicationsModule} from '../job-applications/job-applications.module';
import { ConsultationModule} from '../consultation/consultation.module';
import { SiteContentModule} from '../site-content/site-content.module';
import { NewsletterModule}from '../newsletter/newsletter.module';
import { PortfolioModule}from '../portfolio/portfolio.module';
import { UploadModule} from '../upload/upload.module';
import { CategoriesModule}from '../categories/categories.module';
import { ArticleModule} from '../article/article.module';
import { ContactRequestModule } from '../contact-request/contact-request.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AuthModule, 
    CooperationTypesModule,
    JobApplicationsModule,
    ConsultationModule,
    SiteContentModule,
    NewsletterModule,
    PortfolioModule,
    UploadModule,
    CategoriesModule,
    ArticleModule,
    ContactRequestModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}