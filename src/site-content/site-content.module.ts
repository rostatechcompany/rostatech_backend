import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';
import { Client, ClientSchema } from './schemas/client.schema';
import { Service, ServiceSchema } from './schemas/service.schema';
import { SiteContentService } from './site-content.service';
import { SiteContentController } from './site-content.controller';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
    AuthModule,
    UploadModule,
  ],
  controllers: [SiteContentController, SiteContentController],
  providers: [SiteContentService],
  exports: [SiteContentService],
})
export class SiteContentModule {}