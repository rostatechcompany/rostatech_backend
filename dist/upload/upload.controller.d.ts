import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File, folder?: string): Promise<{
        success: boolean;
        data: {
            url: string;
        };
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteImage(url: string): Promise<{
        success: boolean;
        message: {
            fa: string;
            en: string;
        };
    }>;
}
