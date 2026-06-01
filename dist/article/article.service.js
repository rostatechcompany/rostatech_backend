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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("./schemas/article.schema");
const jalali_1 = require("../common/utils/jalali");
const upload_service_1 = require("../upload/upload.service");
const slugify_1 = __importDefault(require("slugify"));
let ArticleService = class ArticleService {
    articleModel;
    uploadService;
    constructor(articleModel, uploadService) {
        this.articleModel = articleModel;
        this.uploadService = uploadService;
    }
    generateSlug(title) {
        return (0, slugify_1.default)(title, { lower: true, strict: true, replacement: '-' });
    }
    async findAllPublic(page = 1, limit = 10, categoryId) {
        const filter = { isActive: true };
        if (categoryId)
            filter.category = categoryId;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.articleModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('title slug coverImageUrl readingTime category createdAt')
                .populate('category', 'title')
                .lean(),
            this.articleModel.countDocuments(filter),
        ]);
        const data = items.map((item) => ({
            _id: item._id,
            title: item.title,
            slug: item.slug,
            coverImageUrl: item.coverImageUrl,
            readingTime: item.readingTime,
            category: item.category?.title ?? null,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(item.createdAt, 'jDD jMMMM jYYYY'),
        }));
        return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async findOneBySlug(slug) {
        const article = await this.articleModel
            .findOne({ slug, isActive: true })
            .populate('category', 'title')
            .populate('author', 'fullName username')
            .lean();
        if (!article)
            throw new common_1.NotFoundException('مقاله یافت نشد');
        const { createdAt, updatedAt, __v, category, author, ...rest } = article;
        return { ...rest,
            category: category?.title ?? null,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jDD jMMMM jYYYY') };
    }
    async create(dto, adminId) {
        let slug = this.generateSlug(dto.title);
        const exist = await this.articleModel.findOne({ slug });
        if (exist)
            slug += '-' + Date.now();
        const article = await this.articleModel.create({
            title: dto.title,
            slug,
            delta: dto.delta ?? {},
            coverImageUrl: dto.coverImageUrl ?? '',
            readingTime: dto.readingTime ?? 3,
            category: dto.category,
            isActive: dto.isActive ?? true,
            author: adminId,
        });
        return {
            message: { fa: 'مقاله ایجاد شد', en: 'Article created' },
            id: article._id,
            slug: article.slug,
        };
    }
    async findAllAdmin(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.articleModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category', 'title')
                .populate('author', 'fullName username')
                .lean(),
            this.articleModel.countDocuments(),
        ]);
        const data = items.map((item) => {
            const { createdAt, updatedAt, __v, author, category, ...rest } = item;
            return {
                ...rest,
                authorName: author?.fullName ?? null,
                category: category?.title ?? null,
                createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
            };
        });
        return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async findOneAdmin(id) {
        const article = await this.articleModel
            .findById(id)
            .populate('category', 'title')
            .populate('author', 'fullName username')
            .lean();
        if (!article)
            throw new common_1.NotFoundException('مقاله یافت نشد');
        const { createdAt, updatedAt, __v, author, category, ...rest } = article;
        return {
            ...rest,
            author: author?.fullName ?? null,
            category: category?.title ?? null,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
        };
    }
    async update(id, dto) {
        const article = await this.articleModel.findById(id);
        if (!article)
            throw new common_1.NotFoundException('مقاله یافت نشد');
        if (article.delta === undefined) {
            article.delta = {};
        }
        if (dto.coverImageUrl !== undefined && dto.coverImageUrl !== article.coverImageUrl) {
            if (article.coverImageUrl) {
                try {
                    await this.uploadService.deleteImage(article.coverImageUrl);
                }
                catch (e) {
                    console.error('خطا در حذف تصویر قبلی:', e);
                }
            }
        }
        if (dto.title !== undefined) {
            const newSlug = this.generateSlug(dto.title);
            const existing = await this.articleModel.findOne({
                slug: newSlug,
                _id: { $ne: id },
            });
            article.slug = existing ? `${newSlug}-${Date.now()}` : newSlug;
        }
        if (dto.delta !== undefined)
            article.delta = dto.delta;
        if (dto.coverImageUrl !== undefined)
            article.coverImageUrl = dto.coverImageUrl;
        if (dto.readingTime !== undefined)
            article.readingTime = dto.readingTime;
        if (dto.category !== undefined)
            article.category = dto.category;
        if (dto.isActive !== undefined)
            article.isActive = dto.isActive;
        if (dto.title !== undefined)
            article.title = dto.title;
        await article.save();
        return {
            message: { fa: 'مقاله ویرایش شد', en: 'Article edited' },
        };
    }
    async remove(id) {
        const article = await this.articleModel.findById(id);
        if (!article)
            throw new common_1.NotFoundException('مقاله یافت نشد');
        if (article.coverImageUrl) {
            try {
                await this.uploadService.deleteImage(article.coverImageUrl);
            }
            catch (e) {
                console.error(e);
            }
        }
        await this.articleModel.findByIdAndDelete(id);
        return { message: { fa: 'مقاله حذف شد', en: 'Article deleted' } };
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.UploadService])
], ArticleService);
//# sourceMappingURL=article.service.js.map