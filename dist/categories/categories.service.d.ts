import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findActive(): Promise<(Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateCategoryDto): Promise<{
        message: {
            fa: string;
            en: string;
        };
    }>;
    findAll(): Promise<(Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
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
