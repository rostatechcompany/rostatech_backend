import { Document, Schema as MongooseSchema } from 'mongoose';
export type JobApplicationDocument = JobApplication & Document;
export declare class JobApplication {
    fullName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    address: string;
    degree: string;
    university: string;
    skills: string;
    workExperience: string;
    portfolio: string;
    jobTitle: string;
    cooperationTypes?: string[];
    status: string;
    adminNotes: string;
}
export declare const JobApplicationSchema: MongooseSchema<JobApplication, import("mongoose").Model<JobApplication, any, any, any, any, any, JobApplication>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobApplication, Document<unknown, {}, JobApplication, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    fullName?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    birthDate?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    degree?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    university?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    skills?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    workExperience?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    portfolio?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    jobTitle?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cooperationTypes?: import("mongoose").SchemaDefinitionProperty<string[] | undefined, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    adminNotes?: import("mongoose").SchemaDefinitionProperty<string, JobApplication, Document<unknown, {}, JobApplication, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobApplication & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, JobApplication>;
