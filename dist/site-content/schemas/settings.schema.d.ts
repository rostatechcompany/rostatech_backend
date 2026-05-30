import { Document } from 'mongoose';
export type SettingsDocument = Settings & Document;
export declare class SocialLink {
    name: string;
    url: string;
}
export declare class TextSection {
    key: string;
    title: string;
    content: string;
    image: string;
}
export declare class Settings {
    address: string;
    shortDescription: string;
    phoneNumbers: string[];
    socialLinks: {
        name: string;
        url: string;
    }[];
    projectsCount: number;
    satisfactionRate: number;
    partnerCompaniesCount: number;
    textSections: TextSection[];
}
export declare const SettingsSchema: import("mongoose").Schema<Settings, import("mongoose").Model<Settings, any, any, any, any, any, Settings>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, Settings, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    address?: import("mongoose").SchemaDefinitionProperty<string, Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shortDescription?: import("mongoose").SchemaDefinitionProperty<string, Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phoneNumbers?: import("mongoose").SchemaDefinitionProperty<string[], Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    socialLinks?: import("mongoose").SchemaDefinitionProperty<{
        name: string;
        url: string;
    }[], Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    projectsCount?: import("mongoose").SchemaDefinitionProperty<number, Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    satisfactionRate?: import("mongoose").SchemaDefinitionProperty<number, Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    partnerCompaniesCount?: import("mongoose").SchemaDefinitionProperty<number, Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    textSections?: import("mongoose").SchemaDefinitionProperty<TextSection[], Settings, Document<unknown, {}, Settings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Settings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Settings>;
export declare const TextSectionSchema: import("mongoose").Schema<TextSection, import("mongoose").Model<TextSection, any, any, any, any, any, TextSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TextSection, Document<unknown, {}, TextSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TextSection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    key?: import("mongoose").SchemaDefinitionProperty<string, TextSection, Document<unknown, {}, TextSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TextSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, TextSection, Document<unknown, {}, TextSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TextSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, TextSection, Document<unknown, {}, TextSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TextSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, TextSection, Document<unknown, {}, TextSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TextSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TextSection>;
