import { Document } from 'mongoose';
export type NewsletterDocument = Newsletter & Document;
export declare class Newsletter {
    phoneNumber: string;
}
export declare const NewsletterSchema: import("mongoose").Schema<Newsletter, import("mongoose").Model<Newsletter, any, any, any, any, any, Newsletter>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Newsletter, Document<unknown, {}, Newsletter, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Newsletter & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, Newsletter, Document<unknown, {}, Newsletter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Newsletter & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Newsletter>;
