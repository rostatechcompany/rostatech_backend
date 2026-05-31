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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const portfolio_schema_1 = require("./schemas/portfolio.schema");
const team_member_schema_1 = require("../site-content/schemas/team-member.schema");
const jalali_1 = require("../common/utils/jalali");
let PortfolioService = class PortfolioService {
    portfolioModel;
    teamMemberModel;
    constructor(portfolioModel, teamMemberModel) {
        this.portfolioModel = portfolioModel;
        this.teamMemberModel = teamMemberModel;
    }
    async findAllPublic() {
        const items = await this.portfolioModel
            .find()
            .select('desktopImageUrl mobileImageUrl websiteUrl projectName')
            .lean();
        return items;
    }
    async findOnePublic(id) {
        const item = await this.portfolioModel
            .findById(id)
            .select('-__v -createdAt -updatedAt')
            .lean();
        if (!item)
            throw new common_1.NotFoundException('نمونه کار یافت نشد');
        return item;
    }
    async create(dto) {
        const members = await this.teamMemberModel.find({ _id: { $in: dto.teamMemberIds } });
        if (members.length !== dto.teamMemberIds.length) {
            throw new common_1.NotFoundException('یک یا چند عضو تیم یافت نشدند');
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
        return { message: { fa: 'نمونه کار با موفقیت ایجاد شد',
                en: 'Working instance created successfully' }, id: portfolio._id };
    }
    async findAllAdmin() {
        const items = await this.portfolioModel
            .find()
            .select('-__v -createdAt -updatedAt')
            .lean();
        return items.map((item) => ({
            ...item,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(item.createdAt, 'jYYYY/jMM/jDD'),
        }));
    }
    async findOneAdmin(id) {
        const item = await this.portfolioModel
            .findById(id)
            .select('-__v -createdAt -updatedAt')
            .lean();
        if (!item)
            throw new common_1.NotFoundException('نمونه کار یافت نشد');
        const { createdAt, updatedAt, ...rest } = item;
        return {
            ...rest,
            createdAtJalali: jalali_1.JalaliDateUtil.toJalali(createdAt, 'jYYYY/jMM/jDD'),
        };
    }
    async update(id, dto) {
        const portfolio = await this.portfolioModel.findById(id);
        if (!portfolio)
            throw new common_1.NotFoundException('نمونه کار یافت نشد');
        if (dto.teamMemberIds) {
            const members = await this.teamMemberModel.find({ _id: { $in: dto.teamMemberIds } });
            if (members.length !== dto.teamMemberIds.length) {
                throw new common_1.NotFoundException('یک یا چند عضو تیم یافت نشدند');
            }
            dto.teamMembers = members.map(m => ({
                memberId: m._id.toString(),
                fullName: m.fullName,
                position: m.position,
            }));
            delete dto.teamMemberIds;
        }
        Object.assign(portfolio, dto);
        await portfolio.save();
        return { message: { fa: 'نمونه کار با موفقیت ویرایش شد',
                en: 'The sample was successfully edited' } };
    }
    async remove(id) {
        const result = await this.portfolioModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('نمونه کار یافت نشد');
        return { message: { fa: 'نمونه کار حذف شد', en: 'Work sample deleted' } };
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(portfolio_schema_1.Portfolio.name)),
    __param(1, (0, mongoose_1.InjectModel)(team_member_schema_1.TeamMember.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map