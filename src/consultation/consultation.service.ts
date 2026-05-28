import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation, ConsultationDocument } from './schemas/consultation.schema';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { JalaliDateUtil } from '../common/utils/jalali';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name) private consultationModel: Model<ConsultationDocument>,
  ) {}

  // public
  async create(dto: CreateConsultationDto) {
    const consultation = await this.consultationModel.create(dto);
    return {
      message: {
        fa: 'درخواست مشاوره شما با موفقیت ثبت شد',
        en: 'Your consultation request has been submitted',
      },
      id: consultation._id,
    };
  }

  // for admin 
  // ==============================================

  // list
  async findAll(status?: string) {
    const filter: any = {};
    if (status) filter.status = status;

    const consultations = await this.consultationModel
      .find(filter)
      .select('fullName phoneNumber subject status createdAt')
      .lean();

    return consultations.map((c: any) => ({
      _id: c._id,
      fullName: c.fullName,
      phoneNumber: c.phoneNumber,
      subject: c.subject,
      status: c.status,
      createdAtJalali: JalaliDateUtil.toJalali(c.createdAt, 'jYYYY/jMM/jDD'),
    }));
  }

  // detailed
  async findOne(id: string) {
    const consultation = await this.consultationModel
      .findById(id)
      .select('-__v')
      .lean();

    if (!consultation) throw new NotFoundException('درخواست مشاوره یافت نشد');

    const { createdAt, updatedAt, ...rest } = consultation as any;
    return {
      ...rest,
      createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
    };
  }

  // change status and add note
  async update(id: string, dto: UpdateConsultationDto) {
    const updated = await this.consultationModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('درخواست مشاوره یافت نشد');
    return {
      message: {
        fa: 'تغییرات با موفقیت ثبت شد',
        en: 'changes has been submitted',
      },
      id: updated._id,
    };
  }

  // delete
  async remove(id: string) {
    const deleted = await this.consultationModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('درخواست مشاوره یافت نشد');
    return { message: {fa: 'درخواست با موفقیت حذف شد', 
                  en: 'Request successfully deleted'} };
  }
}