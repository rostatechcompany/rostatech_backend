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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AuthModule, 
    CooperationTypesModule,
    JobApplicationsModule,
    ConsultationModule,
    SiteContentModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}