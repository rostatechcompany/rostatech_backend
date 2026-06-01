import { Document } from 'mongoose';
export type AdminDocument = Admin & Document;
export declare enum AdminRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin"
}
export declare enum AdminStatus {
    PENDING = "pending",
    REJECTED = "rejected",
    ACTIVE = "active"
}
export declare class Admin {
    username: string;
    password: string;
    fullName: string;
    role: AdminRole;
    isActive: boolean;
    status: AdminStatus;
    currentJti?: string;
}
export declare const AdminSchema: import("mongoose").Schema<Admin, import("mongoose").Model<Admin, any, any, any, any, any, Admin>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admin, Document<unknown, {}, Admin, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    username?: import("mongoose").SchemaDefinitionProperty<string, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fullName?: import("mongoose").SchemaDefinitionProperty<string, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<AdminRole, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<AdminStatus, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currentJti?: import("mongoose").SchemaDefinitionProperty<string | undefined, Admin, Document<unknown, {}, Admin, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Admin>;
