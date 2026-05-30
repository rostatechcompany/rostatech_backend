import { Document } from 'mongoose';
export type ServiceDocument = Service & Document;
export declare class Service {
    title: string;
    description: string;
    imageUrl: string;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, any, any, Service>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, Document<unknown, {}, Service, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Service>;
