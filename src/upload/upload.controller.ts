// import {
//   Controller,
//   Post,
//   Delete,
//   UploadedFile,
//   UseInterceptors,
//   UseGuards,
//   Body,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import {
//   ApiBearerAuth,
//   ApiConsumes,
//   ApiBody,
//   ApiOperation,
//   ApiTags,
// } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
// import { AdminRole } from '../admin/schemas/admin.schema';
// import { UploadService } from './upload.service';
// import { FileUploadDto, DeleteImageDto, UploadImageDto } from './dto/upload.dto';

// @ApiTags('Upload')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard,)
// @Controller('admin/upload')
// export class UploadController {
//   constructor(private readonly uploadService: UploadService) {}

//   @Post('image')
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({ type: UploadImageDto })
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadImage(
//     @UploadedFile() file: Express.Multer.File,
//     @Body('folder') folder?: string,
//   ) {
//     const subFolder = folder || 'general';
//     const url = await this.uploadService.uploadImage(file, subFolder);
//     return {
//       success: true,
//       data: { url },
//       message: { fa: 'تصویر با موفقیت آپلود شد', en: 'Image uploaded successfully' },
//     };
//   }

//   @Delete('image')
//   @ApiBody({ type: DeleteImageDto })
//   async deleteImage(@Body('url') url: string) {
//     await this.uploadService.deleteImage(url);
//     return {
//       success: true,
//       message: { fa: 'تصویر با موفقیت حذف شد', en: 'Image deleted successfully' },
//     };
//   }
// }