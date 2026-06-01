import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly service;
    constructor(service: ArticleService);
    findAll(page?: string, limit?: string, category?: string): Promise<{
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
    findOne(slug: string): Promise<any>;
}
