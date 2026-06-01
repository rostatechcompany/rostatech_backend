import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JalaliDateUtil } from '../common/utils/jalali';
import { UploadService } from '../upload/upload.service';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private uploadService: UploadService,
  ) {}

  private generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true, replacement: '-' });
  }
  
  // Public
  async findAllPublic(page = 1, limit = 10, categoryId?: string) {
    const filter: any = { isActive: true };
    if (categoryId) filter.category = categoryId;
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
    const data = items.map((item: any) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      coverImageUrl: item.coverImageUrl,
      readingTime: item.readingTime,
      category: item.category?.title ?? null,
      createdAtJalali: JalaliDateUtil.toJalali(item.createdAt, 'jDD jMMMM jYYYY'),
    }));
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneBySlug(slug: string) {
    const article = await this.articleModel
      .findOne({ slug, isActive: true })
      .populate('category', 'title')
      .populate('author', 'fullName username')
      .lean();
    if (!article) throw new NotFoundException('مقاله یافت نشد');
    const { createdAt, updatedAt, __v, category, author, ...rest } = article as any;
    return { ...rest, 
      category: category?.title ?? null,
      createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jDD jMMMM jYYYY') };
  }

  // for admin
  // async create(dto: CreateArticleDto, adminId: string) {
  //   let slug = this.generateSlug(dto.title);
  //   const exist = await this.articleModel.findOne({ slug });
  //   if (exist) slug += '-' + Date.now();

  //   const article = await this.articleModel.create({
  //     ...dto,
  //     slug,
  //     author: adminId,
  //     readingTime: dto.readingTime ?? 3,
  //   });
  //   return { message: {fa:'مقاله ایجاد شد', en: 'Article created'}, id: article._id, slug: article.slug };
  // }
  async create(dto: CreateArticleDto, adminId: string) {
    let slug = this.generateSlug(dto.title);
    const exist = await this.articleModel.findOne({ slug });
    if (exist) slug += '-' + Date.now();

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

    const data = items.map((item: any) => {
      const { createdAt, updatedAt, __v, author, category, ...rest } = item;
      return {
        ...rest,
        authorName: author?.fullName ?? null,
        category: category?.title ?? null,
        createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
      };
    });

    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOneAdmin(id: string) {
    const article = await this.articleModel
      .findById(id)
      .populate('category', 'title')
      .populate('author', 'fullName username')
      .lean();
    if (!article) throw new NotFoundException('مقاله یافت نشد');

    const { createdAt, updatedAt, __v, author, category, ...rest } = article as any;
    return {
      ...rest,
      author: author?.fullName ?? null,
      category: category?.title ?? null,
      createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
    };
  }

  // async update(id: string, dto: UpdateArticleDto) {
  //   const article = await this.articleModel.findById(id);
  //   if (!article) throw new NotFoundException('مقاله یافت نشد');

  //   if (dto.coverImageUrl !== undefined && dto.coverImageUrl !== article.coverImageUrl) {
  //     if (article.coverImageUrl) {
  //       try { await this.uploadService.deleteImage(article.coverImageUrl); } catch (e) { console.error(e); }
  //     }
  //   }

  //   if (dto.title) {
  //     const newSlug = this.generateSlug(dto.title);
  //     const existing = await this.articleModel.findOne({ slug: newSlug, _id: { $ne: id } });
  //     (dto as any).slug = existing ? newSlug + '-' + Date.now() : newSlug;
  //   }

  //   Object.assign(article, dto);
  //   await article.save();
  //   return { message: {fa: 'مقاله ویرایش شد', en: 'Article edited'} };
  // }
  async update(id: string, dto: UpdateArticleDto) {
    const article = await this.articleModel.findById(id);
    if (!article) throw new NotFoundException('مقاله یافت نشد');

    // اگر به هر دلیلی سند موجود delta نداشت، یک مقدار پیش‌فرض بده
    if (article.delta === undefined) {
      article.delta = {};
    }

    // مدیریت تصویر کاور
    if (dto.coverImageUrl !== undefined && dto.coverImageUrl !== article.coverImageUrl) {
      if (article.coverImageUrl) {
        try {
          await this.uploadService.deleteImage(article.coverImageUrl);
        } catch (e) {
          console.error('خطا در حذف تصویر قبلی:', e);
        }
      }
    }

    // به‌روزرسانی slug در صورت تغییر عنوان
    if (dto.title !== undefined) {
      const newSlug = this.generateSlug(dto.title);
      const existing = await this.articleModel.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      article.slug = existing ? `${newSlug}-${Date.now()}` : newSlug;
    }

    // اعمال فیلدهایی که در DTO وجود دارند (با محافظت از delta)
    if (dto.delta !== undefined)            article.delta = dto.delta;
    if (dto.coverImageUrl !== undefined)    article.coverImageUrl = dto.coverImageUrl;
    if (dto.readingTime !== undefined)      article.readingTime = dto.readingTime;
    if (dto.category !== undefined)         article.category = dto.category;
    if (dto.isActive !== undefined)         article.isActive = dto.isActive;
    if (dto.title !== undefined)            article.title = dto.title;

    await article.save();

    return {
      message: { fa: 'مقاله ویرایش شد', en: 'Article edited' },
    };
  }

  async remove(id: string) {
    const article = await this.articleModel.findById(id);
    if (!article) throw new NotFoundException('مقاله یافت نشد');
    if (article.coverImageUrl) {
      try { await this.uploadService.deleteImage(article.coverImageUrl); } catch (e) { console.error(e); }
    }
    await this.articleModel.findByIdAndDelete(id);
    return { message: {fa:'مقاله حذف شد', en: 'Article deleted'}};
  }
}