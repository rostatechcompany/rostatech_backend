import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
export declare class ConsultationController {
    private readonly consultationService;
    constructor(consultationService: ConsultationService);
    create(dto: CreateConsultationDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
}
