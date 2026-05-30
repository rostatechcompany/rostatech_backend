import { Model } from 'mongoose';
import { NewsletterDocument } from './schemas/newsletter.schema';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
export declare class NewsletterService {
    private newsletterModel;
    constructor(newsletterModel: Model<NewsletterDocument>);
    create(dto: CreateNewsletterDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            _id: any;
            phoneNumber: any;
            createdAtJalali: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    remove(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
