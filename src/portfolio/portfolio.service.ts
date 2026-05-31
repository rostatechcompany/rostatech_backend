import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { TeamMember, TeamMemberDocument } from '../site-content/schemas/team-member.schema';
import { JalaliDateUtil } from '../common/utils/jalali';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  // public (just picture and url of each )
  async findAllPublic() {
    const items = await this.portfolioModel
      .find()
      .select('desktopImageUrl mobileImageUrl websiteUrl projectName')
      .lean();

    return items;
  }

  // public (detailed)
  async findOnePublic(id: string) {
    const item = await this.portfolioModel
      .findById(id)
      .select('-__v -createdAt -updatedAt')
      .lean();

    if (!item) throw new NotFoundException('نمونه کار یافت نشد');
    return item;
  }

  // for admin 
  // =========================================
  // create
  async create(dto: CreatePortfolioDto) {
    const members = await this.teamMemberModel.find({ _id: { $in: dto.teamMemberIds } });
    if (members.length !== dto.teamMemberIds.length) {
      throw new NotFoundException('یک یا چند عضو تیم یافت نشدند');
    }

    const teamMembers = members.map(m => ({
      memberId: m._id.toString(),
      fullName: m.fullName,
      position: m.position,
    }));

    const portfolio = await this.portfolioModel.create({
      ...dto,
      teamMembers,
    });

    return { message: {fa:'نمونه کار با موفقیت ایجاد شد', 
                       en: 'Working instance created successfully'}, id: portfolio._id };
  }


  // list 
  async findAllAdmin() {
    const items = await this.portfolioModel
      .find()
      .select('-__v -createdAt -updatedAt')
      .lean();

    return items.map((item: any) => ({
      ...item,
      createdAtJalali: JalaliDateUtil.toJalali(item.createdAt, 'jYYYY/jMM/jDD'),
    }));
  }

  // detailed 
  async findOneAdmin(id: string) {
    const item = await this.portfolioModel
      .findById(id)
      .select('-__v -createdAt -updatedAt')
      .lean();

    if (!item) throw new NotFoundException('نمونه کار یافت نشد');
    const { createdAt, updatedAt, ...rest } = item as any;
    return {
      ...rest,
      createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
    };
  }

  // edit
  async update(id: string, dto: UpdatePortfolioDto) {
    const portfolio = await this.portfolioModel.findById(id);
    if (!portfolio) throw new NotFoundException('نمونه کار یافت نشد');

    if (dto.teamMemberIds) {
      const members = await this.teamMemberModel.find({ _id: { $in: dto.teamMemberIds } });
      if (members.length !== dto.teamMemberIds.length) {
        throw new NotFoundException('یک یا چند عضو تیم یافت نشدند');
      }
      (dto as any).teamMembers = members.map(m => ({
        memberId: m._id.toString(),
        fullName: m.fullName,
        position: m.position,
      }));
      delete dto.teamMemberIds;
    }

    Object.assign(portfolio, dto);
    await portfolio.save();
    return { message: {fa: 'نمونه کار با موفقیت ویرایش شد', 
                       en: 'The sample was successfully edited'} };
  }

  // delete
  async remove(id: string) {
    const result = await this.portfolioModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('نمونه کار یافت نشد');
    return { message: {fa: 'نمونه کار حذف شد', en: 'Work sample deleted'}};
  }
}