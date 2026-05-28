import { Document } from 'mongoose';
export type CooperationTypeDocument = CooperationType & Document;
export declare class CooperationType {
    title: string;
    isActive: boolean;
}
export declare const CooperationTypeSchema: import("mongoose").Schema<CooperationType, import("mongoose").Model<CooperationType, any, any, any, any, any, CooperationType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CooperationType, Document<unknown, {}, CooperationType, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CooperationType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, CooperationType, Document<unknown, {}, CooperationType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CooperationType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, CooperationType, Document<unknown, {}, CooperationType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CooperationType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, CooperationType>;
