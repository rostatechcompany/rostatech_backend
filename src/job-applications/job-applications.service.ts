import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobApplication, JobApplicationDocument } from './schemas/job-application.schema';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JalaliDateUtil } from '../common/utils/jalali';
import { CooperationType, CooperationTypeDocument } from '../cooperation-types/schemas/cooperation-type.schema';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectModel(JobApplication.name) private applicationModel: Model<JobApplicationDocument>,
    @InjectModel(CooperationType.name) private cooperationTypeModel: Model<CooperationTypeDocument>,
  ) {}

  // General: Register a new request
  async create(createDto: CreateJobApplicationDto) {

    const ids = createDto.cooperationTypes;
    const cooperationDocs = await this.cooperationTypeModel.find({
      _id: { $in: ids },
    });
    if (cooperationDocs.length !== ids.length) {
      throw new BadRequestException('یک یا چند نوع همکاری نامعتبر است');
    }

    const titles = cooperationDocs.map((doc) => doc.title);

    const applicationData = {
      ...createDto,
      cooperationTypes: titles,
    };

    const application = await this.applicationModel.create(applicationData);
    return {
      message: {fa:'درخواست شما با موفقیت ثبت شد', 
                en: 'Your request has been successfully submitted'},
      id: application._id,
    };
  }

  // for admin
  // ==========================================
  async findAll(status?: string) {
    const filter: any = {};
    if (status) filter.status = status;

    const applications = await this.applicationModel
      .find(filter)
      .select('fullName phoneNumber jobTitle cooperationTypes status createdAt')
      .lean();

    return applications.map((app: any) => ({
      _id: app._id,
      fullName: app.fullName,
      phoneNumber: app.phoneNumber,
      jobTitle: app.jobTitle,
      cooperationTypes: app.cooperationTypes,
      status: app.status,
      createdAtJalali: JalaliDateUtil.toJalali(app.createdAt, 'jYYYY/jMM/jDD'),
    }));
  }

  async findOne(id: string) {
    const application = await this.applicationModel
      .findById(id)
      .select('-__v')
      .lean();

    if (!application) throw new NotFoundException('درخواست یافت نشد');

    const { createdAt, updatedAt, ...rest } = application as any;
      return {
        ...rest,
        createdAtJalali: JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
      };
  }

  async update(id: string, updateDto: UpdateApplicationDto) {
    const updated = await this.applicationModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updated) throw new NotFoundException('درخواست یافت نشد');
    return {
      message: {fa:'درخواست با موفقیت اپدیت شد', 
                en: 'Request has been successfully updated'},
      id: updated._id,
    };
  }

  async remove(id: string) {
    const deleted = await this.applicationModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('درخواست یافت نشد');
    return { message: {fa: 'درخواست با موفقیت حذف شد', 
                      en: 'Request successfully deleted'} };
  }
}