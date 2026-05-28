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
exports.JobApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_application_schema_1 = require("./schemas/job-application.schema");
const jalali_1 = require("../common/utils/jalali");
const cooperation_type_schema_1 = require("../cooperation-types/schemas/cooperation-type.schema");
let JobApplicationsService = class JobApplicationsService {
    applicationModel;
    cooperationTypeModel;
    constructor(applicationModel, cooperationTypeModel) {
        this.applicationModel = applicationModel;
        this.cooperationTypeModel = cooperationTypeModel;
    }
    async create(createDto) {
        const ids = createDto.cooperationTypes;
        const cooperationDocs = await this.cooperationTypeModel.find({
            _id: { $in: ids },
        });
        if (cooperationDocs.length !== ids.length) {
            throw new common_1.BadRequestException('یک یا چند نوع همکاری نامعتبر است');
        }
        const titles = cooperationDocs.map((doc) => doc.title);
        const applicationData = {
            ...createDto,
            cooperationTypes: titles,
        };
        const application = await this.applicationModel.create(applicationData);
        return {
            message: { fa: 'درخواست شما با موفقیت ثبت شد',
                en: 'Your request has been successfully submitted' },
            id: application._id,
        };
    }
    async findAll(status) {
        const filter = {};
        if (status)
            filter.status = status;
        const applications = await this.applicationModel
            .find(filter)
            .select('fullName phoneNumber jobTitle cooperationTypes status createdAt')
            .lean();
        return applications.map((app) => ({
            _id: app._id,
            fullName: app.fullName,
            phoneNumber: app.phoneNumber,
            jobTitle: app.jobTitle,
            cooperationTypes: app.cooperationTypes,
            status: app.status,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(app.createdAt, 'jYYYY/jMM/jDD'),
        }));
    }
    async findOne(id) {
        const application = await this.applicationModel
            .findById(id)
            .select('-__v')
            .lean();
        if (!application)
            throw new common_1.NotFoundException('درخواست یافت نشد');
        const { createdAt, updatedAt, ...rest } = application;
        return {
            ...rest,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
        };
    }
    async update(id, updateDto) {
        const updated = await this.applicationModel.findByIdAndUpdate(id, updateDto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('درخواست یافت نشد');
        return {
            message: { fa: 'درخواست با موفقیت اپدیت شد',
                en: 'Request has been successfully updated' },
            id: updated._id,
        };
    }
    async remove(id) {
        const deleted = await this.applicationModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('درخواست یافت نشد');
        return { message: { fa: 'درخواست با موفقیت حذف شد',
                en: 'Request successfully deleted' } };
    }
};
exports.JobApplicationsService = JobApplicationsService;
exports.JobApplicationsService = JobApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_application_schema_1.JobApplication.name)),
    __param(1, (0, mongoose_1.InjectModel)(cooperation_type_schema_1.CooperationType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], JobApplicationsService);
//# sourceMappingURL=job-applications.service.js.map