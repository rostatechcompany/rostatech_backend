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
exports.CooperationTypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cooperation_type_schema_1 = require("./schemas/cooperation-type.schema");
let CooperationTypesService = class CooperationTypesService {
    cooperationTypeModel;
    constructor(cooperationTypeModel) {
        this.cooperationTypeModel = cooperationTypeModel;
    }
    async findActive() {
        return this.cooperationTypeModel
            .find({ isActive: true })
            .select('title')
            .lean();
    }
    async create(dto) {
        const exists = await this.cooperationTypeModel.findOne({ title: dto.title });
        if (exists) {
            throw new common_1.ConflictException('این نوع همکاری قبلاً ثبت شده است');
        }
        await this.cooperationTypeModel.create(dto);
        return {
            message: { fa: 'نوع همکاری با موفقیت ایجاد شد',
                en: 'Cooperation type successfully created' },
        };
    }
    async findAll() {
        return this.cooperationTypeModel.find().select('-__v -createdAt -updatedAt').lean();
    }
    async update(id, dto) {
        const updated = await this.cooperationTypeModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('نوع همکاری پیدا نشد');
        return {
            message: { fa: 'نوع همکاری با موفقیت اپدیت شد',
                en: 'Cooperation type successfully updated' },
        };
    }
    async remove(id) {
        const deleted = await this.cooperationTypeModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('نوع همکاری پیدا نشد');
        return { message: 'نوع همکاری حذف شد' };
    }
};
exports.CooperationTypesService = CooperationTypesService;
exports.CooperationTypesService = CooperationTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cooperation_type_schema_1.CooperationType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CooperationTypesService);
//# sourceMappingURL=cooperation-types.service.js.map