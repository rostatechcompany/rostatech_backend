import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Portfolio, PortfolioSchema } from './schemas/portfolio.schema';
import { TeamMember, TeamMemberSchema } from '../site-content/schemas/team-member.schema';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
    AuthModule,
    UploadModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService]
})
export class PortfolioModule {}