import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { AdminDocument, AdminStatus } from '../../admin/schemas/admin.schema';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private adminModel;
    constructor(configService: ConfigService, adminModel: Model<AdminDocument>);
    validate(payload: any): Promise<{
        userId: string;
        username: string;
        role: import("../../admin/schemas/admin.schema").AdminRole;
        status: AdminStatus.ACTIVE;
    }>;
}
export {};
