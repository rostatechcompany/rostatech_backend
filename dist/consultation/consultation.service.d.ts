import { Model } from 'mongoose';
import { ConsultationDocument } from './schemas/consultation.schema';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
export declare class ConsultationService {
    private consultationModel;
    constructor(consultationModel: Model<ConsultationDocument>);
    create(dto: CreateConsultationDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    findAll(status?: string): Promise<{
        _id: any;
        fullName: any;
        phoneNumber: any;
        subject: any;
        status: any;
        createdAtJalali: string;
    }[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateConsultationDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
