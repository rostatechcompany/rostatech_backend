import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    getActive(): Promise<(import("./schemas/category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
