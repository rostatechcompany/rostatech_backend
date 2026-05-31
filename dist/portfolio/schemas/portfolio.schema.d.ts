import { Document, Schema as MongooseSchema } from 'mongoose';
export type PortfolioDocument = Portfolio & Document;
export declare class TeamMemberInfo {
    memberId: string;
    fullName: string;
    position: string;
}
export declare class Portfolio {
    desktopImageUrl: string;
    mobileImageUrl: string;
    projectName: string;
    description: string;
    technologies: string[];
    teamMembers: TeamMemberInfo[];
    websiteUrl: string;
}
export declare const PortfolioSchema: MongooseSchema<Portfolio, import("mongoose").Model<Portfolio, any, any, any, any, any, Portfolio>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Portfolio, Document<unknown, {}, Portfolio, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    desktopImageUrl?: import("mongoose").SchemaDefinitionProperty<string, Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mobileImageUrl?: import("mongoose").SchemaDefinitionProperty<string, Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    projectName?: import("mongoose").SchemaDefinitionProperty<string, Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    technologies?: import("mongoose").SchemaDefinitionProperty<string[], Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    teamMembers?: import("mongoose").SchemaDefinitionProperty<TeamMemberInfo[], Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    websiteUrl?: import("mongoose").SchemaDefinitionProperty<string, Portfolio, Document<unknown, {}, Portfolio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Portfolio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Portfolio>;
