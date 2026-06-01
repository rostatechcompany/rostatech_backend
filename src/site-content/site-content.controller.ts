import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteContentService } from './site-content.service';

@ApiTags('Site Content')
@Controller('site-content')
export class SiteContentController {
  constructor(private readonly service: SiteContentService) {}

  @Get('team')
  getTeam() {
    return this.service.getTeam();
  }

  @Get('clients')
  getClients() {
    return this.service.getClients();
  }

  @Get('services')
  getServices() {
    return this.service.getServices();
  }

  @Get('settings')
  getSettings() {
    return this.service.getSettings();
  }

  @Get('about')
  getAboutPage() {
    return this.service.getAboutPagePublic();
  }
}