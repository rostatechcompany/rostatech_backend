import { CooperationTypesService } from './cooperation-types.service';
export declare class CooperationTypesController {
    private readonly service;
    constructor(service: CooperationTypesService);
    getPublic(): Promise<(import("./schemas/cooperation-type.schema").CooperationType & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
