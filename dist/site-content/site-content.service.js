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
const upload_service_1 = require("../upload/upload.service");
let SiteContentService = class SiteContentService {
    settingsModel;
    teamModel;
    clientModel;
    serviceModel;
    uploadService;
    constructor(settingsModel, teamModel, clientModel, serviceModel, uploadService) {
        this.settingsModel = settingsModel;
        this.teamModel = teamModel;
        this.clientModel = clientModel;
        this.serviceModel = serviceModel;
        this.uploadService = uploadService;
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
        const current = await this.settingsModel.findOne();
        if (!current) {
            const created = await this.settingsModel.create(dto);
            return { message: { fa: 'تنظیمات ایجاد شد', en: 'Settings created successfully' } };
        }
        if (dto.textSections !== undefined) {
            const oldSections = current.textSections ?? [];
            const newSectionsMap = new Map(dto.textSections.map(s => [s.key, s]));
            for (const oldSection of oldSections) {
                const oldImage = oldSection.image;
                if (!oldImage)
                    continue;
                const newSection = newSectionsMap.get(oldSection.key);
                if (!newSection) {
                    try {
                        await this.uploadService.deleteImage(oldImage);
                    }
                    catch (e) {
                        console.error('خطا در حذف تصویر حذف‌شده:', e);
                    }
                }
                else if (newSection.image !== oldImage) {
                    try {
                        await this.uploadService.deleteImage(oldImage);
                    }
                    catch (e) {
                        console.error('خطا در حذف تصویر قدیمی:', e);
                    }
                }
            }
        }
        await this.settingsModel.findOneAndUpdate({}, dto, {
            new: true,
            upsert: true,
        }).select('-__v -createdAt -updatedAt');
        return {
            message: {
                fa: 'تنظیمات با موفقیت تغییر یافت',
                en: 'Settings changed successfully',
            },
        };
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
        const member = await this.teamModel.findById(id);
        if (!member)
            throw new common_1.NotFoundException('عضو تیم یافت نشد');
        if (dto.photoUrl !== undefined && dto.photoUrl !== member.photoUrl) {
            if (member.photoUrl) {
                try {
                    await this.uploadService.deleteImage(member.photoUrl);
                }
                catch (error) {
                    console.error('خطا در حذف عکس قدیمی عضو تیم:', error);
                }
            }
        }
        Object.assign(member, dto);
        await member.save();
        return {
            message: {
                fa: 'تغییرات با موفقیت اعمال شد',
                en: 'Changes applied successfully'
            }
        };
    }
    async deleteTeamMember(id) {
        const member = await this.teamModel.findById(id);
        if (!member)
            throw new common_1.NotFoundException('عضو تیم یافت نشد');
        if (member.photoUrl) {
            try {
                await this.uploadService.deleteImage(member.photoUrl);
            }
            catch (error) {
                console.error('خطا در حذف فایل عضو تیم:', error);
            }
        }
        await this.teamModel.findByIdAndDelete(id);
        return {
            message: {
                fa: 'عضو تیم حذف شد',
                en: 'Team member removed'
            }
        };
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
        const client = await this.clientModel.findById(id);
        if (!client)
            throw new common_1.NotFoundException('مشتری یافت نشد');
        if (dto.logoUrl !== undefined && dto.logoUrl !== client.logoUrl) {
            if (client.logoUrl) {
                try {
                    await this.uploadService.deleteImage(client.logoUrl);
                }
                catch (error) {
                    console.error('خطا در حذف لوگوی قدیمی مشتری:', error);
                }
            }
        }
        Object.assign(client, dto);
        await client.save();
        return {
            message: {
                fa: 'تغییرات با موفقیت اعمال شد',
                en: 'Changes applied successfully',
            },
        };
    }
    async deleteClient(id) {
        const client = await this.clientModel.findById(id);
        if (!client)
            throw new common_1.NotFoundException('مشتری یافت نشد');
        if (client.logoUrl) {
            try {
                await this.uploadService.deleteImage(client.logoUrl);
            }
            catch (error) {
                console.error('خطا در حذف لوگوی مشتری:', error);
            }
        }
        await this.clientModel.findByIdAndDelete(id);
        return {
            message: {
                fa: 'مشتری حذف شد',
                en: 'Customer removed',
            },
        };
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
        const service = await this.serviceModel.findById(id);
        if (!service)
            throw new common_1.NotFoundException('خدمات یافت نشد');
        if (dto.imageUrl !== undefined && dto.imageUrl !== service.imageUrl) {
            if (service.imageUrl) {
                try {
                    await this.uploadService.deleteImage(service.imageUrl);
                }
                catch (error) {
                    console.error('خطا در حذف تصویر قدیمی خدمات:', error);
                }
            }
        }
        Object.assign(service, dto);
        await service.save();
        return {
            message: {
                fa: 'تغییرات با موفقیت اعمال شد',
                en: 'Changes applied successfully',
            },
        };
    }
    async deleteService(id) {
        const service = await this.serviceModel.findById(id);
        if (!service)
            throw new common_1.NotFoundException('خدمات یافت نشد');
        if (service.imageUrl) {
            try {
                await this.uploadService.deleteImage(service.imageUrl);
            }
            catch (error) {
                console.error('خطا در حذف تصویر خدمات:', error);
            }
        }
        await this.serviceModel.findByIdAndDelete(id);
        return {
            message: {
                fa: 'خدمت حذف شد',
                en: 'Service removed',
            },
        };
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
        mongoose_2.Model,
        upload_service_1.UploadService])
], SiteContentService);
//# sourceMappingURL=site-content.service.js.map