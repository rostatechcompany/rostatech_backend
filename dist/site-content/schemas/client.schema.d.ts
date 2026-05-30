import { Document } from 'mongoose';
export type ClientDocument = Client & Document;
export declare class Client {
    logoUrl: string;
    companyName: string;
    collaborationDate: string;
    websiteUrl: string;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, any, any, Client>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, Client, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Client & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    logoUrl?: import("mongoose").SchemaDefinitionProperty<string, Client, Document<unknown, {}, Client, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    companyName?: import("mongoose").SchemaDefinitionProperty<string, Client, Document<unknown, {}, Client, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    collaborationDate?: import("mongoose").SchemaDefinitionProperty<string, Client, Document<unknown, {}, Client, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    websiteUrl?: import("mongoose").SchemaDefinitionProperty<string, Client, Document<unknown, {}, Client, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Client>;
