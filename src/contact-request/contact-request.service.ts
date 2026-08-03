import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactRequest, ContactRequestDocument } from './schemas/contact-request.schema';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { JalaliDateUtil } from '../common/utils/jalali';

@Injectable()
export class ContactRequestService {
  constructor(
    @InjectModel(ContactRequest.name) private contactModel: Model<ContactRequestDocument>,
  ) {}

  async create(dto: CreateContactRequestDto) {
    await this.contactModel.create({
      fullName: dto.fullName,
      businessName: dto.businessName,
      activityField: dto.activityField,
      website: dto.website ?? null,
      phoneNumber: dto.phoneNumber,
    });
    return {
      message: 'با تشکر از شما. کارشناسان ما پس از بررسی با شما تماس خواهند گرفت.',
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.contactModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean(),
      this.contactModel.countDocuments(),
    ]);

    const data = items.map((item: any) => ({
      _id: item._id,
      fullName: item.fullName,
      businessName: item.businessName,
      activityField: item.activityField,
      website: item.website,
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

  async remove(id: string) {
    const deleted = await this.contactModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('رکورد یافت نشد');
    return { message: 'حذف با موفقیت انجام شد' };
  }
}