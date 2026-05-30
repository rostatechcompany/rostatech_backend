import { Document } from 'mongoose';
export type TeamMemberDocument = TeamMember & Document;
export declare class TeamMember {
    photoUrl: string;
    fullName: string;
    position: string;
}
export declare const TeamMemberSchema: import("mongoose").Schema<TeamMember, import("mongoose").Model<TeamMember, any, any, any, any, any, TeamMember>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamMember, Document<unknown, {}, TeamMember, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    photoUrl?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fullName?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    position?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TeamMember>;
