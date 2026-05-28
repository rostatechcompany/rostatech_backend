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
exports.ConsultationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const consultation_schema_1 = require("./schemas/consultation.schema");
const jalali_1 = require("../common/utils/jalali");
let ConsultationService = class ConsultationService {
    consultationModel;
    constructor(consultationModel) {
        this.consultationModel = consultationModel;
    }
    async create(dto) {
        const consultation = await this.consultationModel.create(dto);
        return {
            message: {
                fa: 'درخواست مشاوره شما با موفقیت ثبت شد',
                en: 'Your consultation request has been submitted',
            },
            id: consultation._id,
        };
    }
    async findAll(status) {
        const filter = {};
        if (status)
            filter.status = status;
        const consultations = await this.consultationModel
            .find(filter)
            .select('fullName phoneNumber subject status createdAt')
            .lean();
        return consultations.map((c) => ({
            _id: c._id,
            fullName: c.fullName,
            phoneNumber: c.phoneNumber,
            subject: c.subject,
            status: c.status,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(c.createdAt, 'jYYYY/jMM/jDD'),
        }));
    }
    async findOne(id) {
        const consultation = await this.consultationModel
            .findById(id)
            .select('-__v')
            .lean();
        if (!consultation)
            throw new common_1.NotFoundException('درخواست مشاوره یافت نشد');
        const { createdAt, updatedAt, ...rest } = consultation;
        return {
            ...rest,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
        };
    }
    async update(id, dto) {
        const updated = await this.consultationModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('درخواست مشاوره یافت نشد');
        return {
            message: {
                fa: 'تغییرات با موفقیت ثبت شد',
                en: 'changes has been submitted',
            },
            id: updated._id,
        };
    }
    async remove(id) {
        const deleted = await this.consultationModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('درخواست مشاوره یافت نشد');
        return { message: { fa: 'درخواست با موفقیت حذف شد',
                en: 'Request successfully deleted' } };
    }
};
exports.ConsultationService = ConsultationService;
exports.ConsultationService = ConsultationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(consultation_schema_1.Consultation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConsultationService);
//# sourceMappingURL=consultation.service.js.map