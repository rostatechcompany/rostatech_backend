import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CooperationTypesService } from './cooperation-types.service';

@ApiTags('Cooperation Types')
@Controller('cooperation-types')
export class CooperationTypesController {
  constructor(private readonly service: CooperationTypesService) {}

  // General: Get active collaboration types for dropdown
  @Get('public')
  getPublic() {
    return this.service.findActive();
  }
}