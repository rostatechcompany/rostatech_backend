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
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const newsletter_schema_1 = require("./schemas/newsletter.schema");
const jalali_1 = require("../common/utils/jalali");
let NewsletterService = class NewsletterService {
    newsletterModel;
    constructor(newsletterModel) {
        this.newsletterModel = newsletterModel;
    }
    async create(dto) {
        const exists = await this.newsletterModel.findOne({ phoneNumber: dto.phoneNumber });
        if (exists) {
            throw new common_1.ConflictException('این شماره قبلاً ثبت شده است');
        }
        await this.newsletterModel.create(dto);
        return { message: { fa: 'شماره شما با موفقیت ثبت شد',
                en: 'Your number has been successfully registered' } };
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.newsletterModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('-__v')
                .lean(),
            this.newsletterModel.countDocuments(),
        ]);
        const data = items.map((item) => ({
            _id: item._id,
            phoneNumber: item.phoneNumber,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(item.createdAt, 'jYYYY/jMM/jDD'),
        }));
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async remove(id) {
        const deleted = await this.newsletterModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('رکورد یافت نشد');
        return { message: { fa: 'حذف با موفقیت انجام شد',
                en: 'Deleted successfully' } };
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(newsletter_schema_1.Newsletter.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map