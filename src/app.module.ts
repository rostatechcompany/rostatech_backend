import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CooperationTypesModule } from './cooperation-types/cooperation-types.module';
import { ConsultationModule } from './consultation/consultation.module';
import { SiteContentModule } from './site-content/site-content.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UploadModule } from './upload/upload.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticleModule } from './article/article.module';
import { ContactRequestModule } from './contact-request/contact-request.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    
    JobApplicationsModule,
    
    AuthModule,
    
    AdminModule,
    
    CooperationTypesModule,
    
    ConsultationModule,
    
    SiteContentModule,
    
    NewsletterModule,
    
    PortfolioModule,
    
    UploadModule,
    
    CategoriesModule,
    
    ArticleModule,
    
    ContactRequestModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}