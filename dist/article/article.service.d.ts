import { Model } from 'mongoose';
import { ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UploadService } from '../upload/upload.service';
export declare class ArticleService {
    private articleModel;
    private uploadService;
    constructor(articleModel: Model<ArticleDocument>, uploadService: UploadService);
    private generateSlug;
    findAllPublic(page?: number, limit?: number, categoryId?: string): Promise<{
        data: {
            _id: any;
            title: any;
            slug: any;
            coverImageUrl: any;
            readingTime: any;
            category: any;
            createdAtJalali: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOneBySlug(slug: string): Promise<any>;
    create(dto: CreateArticleDto, adminId: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
        slug: string;
    }>;
    findAllAdmin(page?: number, limit?: number): Promise<{
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOneAdmin(id: string): Promise<any>;
    update(id: string, dto: UpdateArticleDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    remove(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
