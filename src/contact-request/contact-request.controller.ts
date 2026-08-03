import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactRequestService } from './contact-request.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';

@ApiTags('Public Forms')
@Controller('contact-requests')
export class ContactRequestController {
  constructor(private readonly service: ContactRequestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'با تشکر از شما. کارشناسان ما پس از بررسی با شما تماس خواهند گرفت.' })
  async create(@Body() dto: CreateContactRequestDto) {
    return await this.service.create(dto);
  }
}