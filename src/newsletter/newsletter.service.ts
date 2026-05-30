import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter, NewsletterDocument } from './schemas/newsletter.schema';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { JalaliDateUtil } from '../common/utils/jalali';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Newsletter.name) private newsletterModel: Model<NewsletterDocument>,
  ) {}

  // submit phone number
  async create(dto: CreateNewsletterDto) {
    const exists = await this.newsletterModel.findOne({ phoneNumber: dto.phoneNumber });
    if (exists) {
      throw new ConflictException('این شماره قبلاً ثبت شده است');
    }
    await this.newsletterModel.create(dto);
    return { message: {fa:'شماره شما با موفقیت ثبت شد', 
                       en: 'Your number has been successfully registered'} };
  }

  // for admin 
  // ======================================================
  // list
  async findAll(page: number = 1, limit: number = 10) {
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

    const data = items.map((item: any) => ({
      _id: item._id,
      phoneNumber: item.phoneNumber,
      createdAtJalali: JalaliDateUtil.toJalali(item.createdAt, 'jYYYY/jMM/jDD'),
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

  // delete
  async remove(id: string) {
    const deleted = await this.newsletterModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('رکورد یافت نشد');
    return { message: {fa:'حذف با موفقیت انجام شد', 
                       en: 'Deleted successfully'} };
  }
}