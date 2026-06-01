"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
let UploadService = class UploadService {
    configService;
    s3Client;
    bucket;
    publicEndpoint;
    constructor(configService) {
        this.configService = configService;
        const endpoint = this.configService.get('LIARA_ENDPOINT');
        const accessKey = this.configService.get('LIARA_ACCESS_KEY');
        const secretKey = this.configService.get('LIARA_SECRET_KEY');
        const bucket = this.configService.get('LIARA_BUCKET_NAME');
        const publicEndpoint = this.configService.get('LIARA_PUBLIC_ENDPOINT');
        if (!bucket || !publicEndpoint) {
            throw new Error('Missing LIARA_BUCKET_NAME or LIARA_PUBLIC_ENDPOINT in environment');
        }
        this.bucket = bucket;
        this.publicEndpoint = publicEndpoint;
        if (!endpoint || !accessKey || !secretKey) {
            throw new Error('Missing Liara S3 environment variables');
        }
        this.s3Client = new client_s3_1.S3Client({
            region: 'default',
            endpoint,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
            forcePathStyle: true,
        });
    }
    async uploadImage(file, subFolder = 'general') {
        if (!file)
            throw new Error('فایلی ارسال نشده است');
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedMimes.includes(file.mimetype)) {
            throw new Error('فرمت فایل مجاز نیست. فقط تصاویر (jpeg, png, gif, webp) قابل قبول هستند.');
        }
        const extension = path.extname(file.originalname);
        const fileName = `rostatech-images/${subFolder}/${(0, uuid_1.v4)()}${extension}`;
        const params = {
            Body: file.buffer,
            Bucket: this.bucket,
            Key: fileName,
            ContentType: file.mimetype,
        };
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand(params));
            return `${this.publicEndpoint}/${fileName}`;
        }
        catch (error) {
            console.error('خطا در آپلود به لیارا:', error);
            throw new Error('خطا در آپلود تصویر، لطفاً مجدداً تلاش کنید.');
        }
    }
    async deleteImage(imageUrl) {
        const key = imageUrl.replace(`${this.publicEndpoint}/`, '');
        if (!key.startsWith('rostatech-images/')) {
            throw new Error('آدرس فایل معتبر نیست');
        }
        const params = {
            Bucket: this.bucket,
            Key: key,
        };
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand(params));
        }
        catch (error) {
            console.error('خطا در حذف فایل از لیارا:', error);
            throw new Error('خطا در حذف تصویر');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map