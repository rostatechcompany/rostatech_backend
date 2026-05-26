import { Document } from 'mongoose';
export type JobPositionDocument = JobPosition & Document;
export declare enum PositionType {
    COOPERATION_TYPE = "cooperation_type",
    JOB_TITLE = "job_title"
}
export declare class JobPosition {
    title: string;
    type: PositionType;
    isActive: boolean;
}
export declare const JobPositionSchema: import("mongoose").Schema<JobPosition, import("mongoose").Model<JobPosition, any, any, any, any, any, JobPosition>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobPosition, Document<unknown, {}, JobPosition, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<JobPosition & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, JobPosition, Document<unknown, {}, JobPosition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobPosition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<PositionType, JobPosition, Document<unknown, {}, JobPosition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobPosition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, JobPosition, Document<unknown, {}, JobPosition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobPosition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, JobPosition>;
