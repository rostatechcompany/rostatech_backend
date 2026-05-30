import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    create(dto: CreateNewsletterDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
