import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@ApiTags('Articles')
@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'category', required: false })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string, @Query('category') category?: string) {
    return this.service.findAllPublic(+(page || 1), +(limit || 10), category);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) { return this.service.findOneBySlug(slug); }
}