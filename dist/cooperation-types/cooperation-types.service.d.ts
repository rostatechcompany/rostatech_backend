import { Model } from 'mongoose';
import { CooperationType, CooperationTypeDocument } from './schemas/cooperation-type.schema';
import { CreateCooperationTypeDto } from './dto/create-cooperation-type.dto';
import { UpdateCooperationTypeDto } from './dto/update-cooperation-type.dto';
export declare class CooperationTypesService {
    private cooperationTypeModel;
    constructor(cooperationTypeModel: Model<CooperationTypeDocument>);
    findActive(): Promise<(CooperationType & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateCooperationTypeDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAll(): Promise<(CooperationType & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateCooperationTypeDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
