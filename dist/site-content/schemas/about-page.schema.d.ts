import { Document, Schema as MongooseSchema } from 'mongoose';
export type AboutPageDocument = AboutPage & Document;
export declare class AboutPage {
    title: string;
    delta: any;
    coverImageUrl: string;
    isActive?: boolean;
}
export declare const AboutPageSchema: MongooseSchema<AboutPage, import("mongoose").Model<AboutPage, any, any, any, any, any, AboutPage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AboutPage, Document<unknown, {}, AboutPage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, AboutPage, Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    delta?: import("mongoose").SchemaDefinitionProperty<any, AboutPage, Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coverImageUrl?: import("mongoose").SchemaDefinitionProperty<string, AboutPage, Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, AboutPage, Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AboutPage>;
