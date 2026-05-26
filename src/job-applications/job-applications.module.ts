import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplication, JobApplicationSchema } from './schemas/job-application.schema';
import { JobPosition, JobPositionSchema } from '../job-positions/schemas/job-position.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobApplication.name, schema: JobApplicationSchema },
      { name: JobPosition.name, schema: JobPositionSchema },
    ]),
  ],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}