import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucket: string;
  private publicEndpoint: string;

  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get<string>('LIARA_ENDPOINT');
    const accessKey = this.configService.get<string>('LIARA_ACCESS_KEY');
    const secretKey = this.configService.get<string>('LIARA_SECRET_KEY');
    const bucket = this.configService.get<string>('LIARA_BUCKET_NAME');
    const publicEndpoint = this.configService.get<string>('LIARA_PUBLIC_ENDPOINT');

    if (!bucket || !publicEndpoint) {
      throw new Error('Missing LIARA_BUCKET_NAME or LIARA_PUBLIC_ENDPOINT in environment');
    }

    this.bucket = bucket;
    this.publicEndpoint = publicEndpoint;

    if (!endpoint || !accessKey || !secretKey) {
      throw new Error('Missing Liara S3 environment variables');
    }

    this.s3Client = new S3Client({
      region: 'default',
      endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      forcePathStyle: true,
    });
  }

  /**
   * upload image
   * @param file 
   * @param subFolder 
   * @returns public file url
   */
  async uploadImage(file: Express.Multer.File, subFolder: string = 'general'): Promise<string> {
    if (!file) throw new Error('فایلی ارسال نشده است');

    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new Error('فرمت فایل مجاز نیست. فقط تصاویر (jpeg, png, gif, webp) قابل قبول هستند.');
    }

    const extension = path.extname(file.originalname);
    // final path : rostatech-images/subFolder/uuid.ext
    const fileName = `rostatech-images/${subFolder}/${uuidv4()}${extension}`;

    const params = {
      Body: file.buffer,
      Bucket: this.bucket,
      Key: fileName,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return `${this.publicEndpoint}/${fileName}`;
    } catch (error) {
      console.error('خطا در آپلود به لیارا:', error);
      throw new Error('خطا در آپلود تصویر، لطفاً مجدداً تلاش کنید.');
    }
  }

  /**
   * delete image
   * @param imageUrl full image url
   */
  async deleteImage(imageUrl: string): Promise<void> {
    const key = imageUrl.replace(`${this.publicEndpoint}/`, '');
    if (!key.startsWith('rostatech-images/')) {
      throw new Error('آدرس فایل معتبر نیست');
    }

    const params = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
      console.error('خطا در حذف فایل از لیارا:', error);
      throw new Error('خطا در حذف تصویر');
    }
  }
}