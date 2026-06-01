import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findActive() {
    return this.categoryModel.find({ isActive: true }).select('title').lean();
  }

  // for admin 
  async create(dto: CreateCategoryDto) {
    const exists = await this.categoryModel.findOne({ title: dto.title });
    if (exists) throw new ConflictException('این دسته‌بندی قبلاً ثبت شده است');
    await this.categoryModel.create(dto);
    return { message: {fa:'دسته‌بندی ایجاد شد', en: 'Category created'}};
  }

  async findAll() {
    return this.categoryModel.find().select('-__v -createdAt -updatedAt').lean();
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const cat = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    if (!cat) throw new NotFoundException('دسته‌بندی یافت نشد');
    return { message: {fa:'دسته‌بندی تغییر یافت', en: 'Category changed'}};
  }

  async remove(id: string) {
    const cat = await this.categoryModel.findByIdAndDelete(id);
    if (!cat) throw new NotFoundException('دسته‌بندی یافت نشد');
    return { message: {fa:'دسته‌بندی حذف شد', en: 'Category removed'}};
  }
}