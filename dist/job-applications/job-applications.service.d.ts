import { Model } from 'mongoose';
import { JobApplicationDocument } from './schemas/job-application.schema';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CooperationTypeDocument } from '../cooperation-types/schemas/cooperation-type.schema';
export declare class JobApplicationsService {
    private applicationModel;
    private cooperationTypeModel;
    constructor(applicationModel: Model<JobApplicationDocument>, cooperationTypeModel: Model<CooperationTypeDocument>);
    create(createDto: CreateJobApplicationDto): Promise<{
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
        jobTitle: any;
        cooperationTypes: any;
        status: any;
        createdAtJalali: string;
    }[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateApplicationDto): Promise<{
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
