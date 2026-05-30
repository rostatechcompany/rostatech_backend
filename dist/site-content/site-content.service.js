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
exports.SiteContentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const settings_schema_1 = require("./schemas/settings.schema");
const team_member_schema_1 = require("./schemas/team-member.schema");
const client_schema_1 = require("./schemas/client.schema");
const service_schema_1 = require("./schemas/service.schema");
let SiteContentService = class SiteContentService {
    settingsModel;
    teamModel;
    clientModel;
    serviceModel;
    constructor(settingsModel, teamModel, clientModel, serviceModel) {
        this.settingsModel = settingsModel;
        this.teamModel = teamModel;
        this.clientModel = clientModel;
        this.serviceModel = serviceModel;
        this.initSettings();
    }
    async initSettings() {
        const settings = await this.settingsModel.findOne();
        if (!settings) {
            await this.settingsModel.create({});
        }
    }
    async getSettings() {
        const settings = await this.settingsModel
            .findOne()
            .select('-__v -createdAt -updatedAt')
            .lean();
        if (!settings)
            throw new common_1.NotFoundException('تنظیمات یافت نشد');
        if (settings.textSections && settings.textSections.length > 0) {
            settings.textSections = settings.textSections.map((section) => {
                const { createdAt, updatedAt, ...rest } = section;
                return rest;
            });
        }
        return settings;
    }
    async updateSettings(dto) {
        await this.settingsModel.findOneAndUpdate({}, dto, {
            new: true,
            upsert: true,
        }).select('-__v -createdAt -updatedAt');
        return { message: { fa: "تنطیمات با موفقیت تغییر یافت",
                en: "Settings changed successfully" } };
    }
    async getTeam() {
        return this.teamModel.find().select('-__v -createdAt -updatedAt').lean();
    }
    async createTeamMember(dto) {
        await this.teamModel.create(dto);
        return { message: { fa: "عضو تیم با موفقیت اضافه شد",
                en: "Team member added successfully" } };
    }
    async updateTeamMember(id, dto) {
        const member = await this.teamModel.findByIdAndUpdate(id, dto, { new: true });
        if (!member)
            throw new common_1.NotFoundException('عضو تیم یافت نشد');
        return { message: { fa: "تغییرات با موفقیت اعمال شد",
                en: "Changes applied successfully" } };
    }
    async deleteTeamMember(id) {
        const member = await this.teamModel.findByIdAndDelete(id);
        if (!member)
            throw new common_1.NotFoundException('عضو تیم یافت نشد');
        return { message: { fa: 'عضو تیم حذف شد',
                en: 'Team member removed' } };
    }
    async getClients() {
        return this.clientModel.find().select('-__v -createdAt -updatedAt').lean();
    }
    async createClient(dto) {
        await this.clientModel.create(dto);
        return { message: { fa: "مشتری با موفقیت اضافه شد",
                en: "Customer added successfully" } };
    }
    async updateClient(id, dto) {
        const client = await this.clientModel.findByIdAndUpdate(id, dto, { new: true });
        if (!client)
            throw new common_1.NotFoundException('مشتری یافت نشد');
        return { message: { fa: "تغییرات با موفقیت اعمال شد",
                en: "Changes applied successfully" } };
    }
    async deleteClient(id) {
        const client = await this.clientModel.findByIdAndDelete(id);
        if (!client)
            throw new common_1.NotFoundException('مشتری یافت نشد');
        return { message: { fa: 'مشتری حذف شد',
                en: 'Customer removed' } };
    }
    async getServices() {
        return this.serviceModel.find().select('-__v -createdAt -updatedAt').lean();
    }
    async createService(dto) {
        await this.serviceModel.create(dto);
        return { message: { fa: "خدمت با موفقیت اضافه شد",
                en: "Service added successfully" } };
    }
    async updateService(id, dto) {
        const service = await this.serviceModel.findByIdAndUpdate(id, dto, { new: true });
        if (!service)
            throw new common_1.NotFoundException('خدمات یافت نشد');
        return { message: { fa: "تغییرات با موفقیت اعمال شد",
                en: "Changes applied successfully" } };
    }
    async deleteService(id) {
        const service = await this.serviceModel.findByIdAndDelete(id);
        if (!service)
            throw new common_1.NotFoundException('خدمات یافت نشد');
        return { message: { fa: 'خدمت حذف شد',
                en: 'Service removed' } };
    }
};
exports.SiteContentService = SiteContentService;
exports.SiteContentService = SiteContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __param(1, (0, mongoose_1.InjectModel)(team_member_schema_1.TeamMember.name)),
    __param(2, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __param(3, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SiteContentService);
//# sourceMappingURL=site-content.service.js.map