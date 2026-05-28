import { Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CooperationType, CooperationTypeDocument } from './schemas/cooperation-type.schema';
import { CreateCooperationTypeDto } from './dto/create-cooperation-type.dto';
import { UpdateCooperationTypeDto } from './dto/update-cooperation-type.dto';

@Injectable()
export class CooperationTypesService {
  constructor(
    @InjectModel(CooperationType.name) private cooperationTypeModel: Model<CooperationTypeDocument>,
  ) {}

  async findActive() {
    return this.cooperationTypeModel
      .find({ isActive: true })
      .select('title')  
      .lean();
  }

  async create(dto: CreateCooperationTypeDto) {
    const exists = await this.cooperationTypeModel.findOne({ title: dto.title });
    if (exists) {
      throw new ConflictException('این نوع همکاری قبلاً ثبت شده است');
    }

    await this.cooperationTypeModel.create(dto);
    return {
      message: {fa:'نوع همکاری با موفقیت ایجاد شد', 
                en: 'Cooperation type successfully created'},
    };
  }

  async findAll() {
    return this.cooperationTypeModel.find().select('-__v -createdAt -updatedAt').lean();
  }

  async update(id: string, dto: UpdateCooperationTypeDto) {
    const updated = await this.cooperationTypeModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('نوع همکاری پیدا نشد');
    return {
      message: {fa:'نوع همکاری با موفقیت اپدیت شد', 
                en: 'Cooperation type successfully updated'},
    };
  }

  async remove(id: string) {
    const deleted = await this.cooperationTypeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('نوع همکاری پیدا نشد');
    return { message: 'نوع همکاری حذف شد' };
  }
}