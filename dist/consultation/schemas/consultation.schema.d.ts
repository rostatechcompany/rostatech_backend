import { Document } from 'mongoose';
export type ConsultationDocument = Consultation & Document;
export declare class Consultation {
    fullName: string;
    phoneNumber: string;
    email?: string;
    subject: string;
    message?: string;
    status: string;
    adminNotes: string;
}
export declare const ConsultationSchema: import("mongoose").Schema<Consultation, import("mongoose").Model<Consultation, any, any, any, any, any, Consultation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Consultation, Document<unknown, {}, Consultation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    fullName?: import("mongoose").SchemaDefinitionProperty<string, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | undefined, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string | undefined, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    adminNotes?: import("mongoose").SchemaDefinitionProperty<string, Consultation, Document<unknown, {}, Consultation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Consultation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Consultation>;
