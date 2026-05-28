import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplication, JobApplicationSchema } from './schemas/job-application.schema';
import { CooperationType, CooperationTypeSchema } from '../cooperation-types/schemas/cooperation-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobApplication.name, schema: JobApplicationSchema },
      { name: CooperationType.name, schema: CooperationTypeSchema },
    ]),
  ],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
  exports: [JobApplicationsService], 
})
export class JobApplicationsModule {}