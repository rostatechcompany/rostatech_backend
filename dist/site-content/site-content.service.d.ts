import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { TeamMember, TeamMemberDocument } from './schemas/team-member.schema';
import { Client, ClientDocument } from './schemas/client.schema';
import { Service, ServiceDocument } from './schemas/service.schema';
import { UpdateSettingsDto } from './dto/settings.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class SiteContentService {
    private settingsModel;
    private teamModel;
    private clientModel;
    private serviceModel;
    constructor(settingsModel: Model<SettingsDocument>, teamModel: Model<TeamMemberDocument>, clientModel: Model<ClientDocument>, serviceModel: Model<ServiceDocument>);
    private initSettings;
    getSettings(): Promise<Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateSettings(dto: UpdateSettingsDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getTeam(): Promise<(TeamMember & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createTeamMember(dto: CreateTeamMemberDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateTeamMember(id: string, dto: UpdateTeamMemberDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteTeamMember(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getClients(): Promise<(Client & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createClient(dto: CreateClientDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateClient(id: string, dto: UpdateClientDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteClient(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    getServices(): Promise<(Service & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createService(dto: CreateServiceDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    updateService(id: string, dto: UpdateServiceDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    deleteService(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
