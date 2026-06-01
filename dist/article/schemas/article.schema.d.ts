import { Document, Schema as MongooseSchema } from 'mongoose';
export type ArticleDocument = Article & Document;
export declare class Article {
    title: string;
    slug: string;
    delta: any;
    coverImageUrl: string;
    readingTime: number;
    category: string;
    isActive: boolean;
    author: string;
}
export declare const ArticleSchema: MongooseSchema<Article, import("mongoose").Model<Article, any, any, any, any, any, Article>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, Document<unknown, {}, Article, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    delta?: import("mongoose").SchemaDefinitionProperty<any, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coverImageUrl?: import("mongoose").SchemaDefinitionProperty<string, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readingTime?: import("mongoose").SchemaDefinitionProperty<number, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<string, Article, Document<unknown, {}, Article, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Article>;
