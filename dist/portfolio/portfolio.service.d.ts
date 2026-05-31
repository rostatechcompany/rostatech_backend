import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { TeamMemberDocument } from '../site-content/schemas/team-member.schema';
export declare class PortfolioService {
    private portfolioModel;
    private teamMemberModel;
    constructor(portfolioModel: Model<PortfolioDocument>, teamMemberModel: Model<TeamMemberDocument>);
    findAllPublic(): Promise<(Portfolio & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOnePublic(id: string): Promise<Portfolio & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: CreatePortfolioDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
        id: import("mongoose").Types.ObjectId;
    }>;
    findAllAdmin(): Promise<any[]>;
    findOneAdmin(id: string): Promise<any>;
    update(id: string, dto: UpdatePortfolioDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    remove(id: string): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
}
