"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./schemas/category.schema");
let CategoriesService = class CategoriesService {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async findActive() {
        return this.categoryModel.find({ isActive: true }).select('title').lean();
    }
    async create(dto) {
        const exists = await this.categoryModel.findOne({ title: dto.title });
        if (exists)
            throw new common_1.ConflictException('این دسته‌بندی قبلاً ثبت شده است');
        await this.categoryModel.create(dto);
        return { message: { fa: 'دسته‌بندی ایجاد شد', en: 'Category created' } };
    }
    async findAll() {
        return this.categoryModel.find().select('-__v -createdAt -updatedAt').lean();
    }
    async update(id, dto) {
        const cat = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
        if (!cat)
            throw new common_1.NotFoundException('دسته‌بندی یافت نشد');
        return { message: { fa: 'دسته‌بندی تغییر یافت', en: 'Category changed' } };
    }
    async remove(id) {
        const cat = await this.categoryModel.findByIdAndDelete(id);
        if (!cat)
            throw new common_1.NotFoundException('دسته‌بندی یافت نشد');
        return { message: { fa: 'دسته‌بندی حذف شد', en: 'Category removed' } };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map