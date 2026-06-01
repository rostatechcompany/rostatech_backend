import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private configService;
    private s3Client;
    private bucket;
    private publicEndpoint;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, subFolder?: string): Promise<string>;
    deleteImage(imageUrl: string): Promise<void>;
}
