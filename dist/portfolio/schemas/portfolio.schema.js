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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSchema = exports.Portfolio = exports.TeamMemberInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TeamMemberInfo = class TeamMemberInfo {
    memberId;
    fullName;
    position;
};
exports.TeamMemberInfo = TeamMemberInfo;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'TeamMember', required: true }),
    __metadata("design:type", String)
], TeamMemberInfo.prototype, "memberId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TeamMemberInfo.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TeamMemberInfo.prototype, "position", void 0);
exports.TeamMemberInfo = TeamMemberInfo = __decorate([
    (0, mongoose_1.Schema)()
], TeamMemberInfo);
let Portfolio = class Portfolio {
    desktopImageUrl;
    mobileImageUrl;
    projectName;
    description;
    technologies;
    teamMembers;
    websiteUrl;
};
exports.Portfolio = Portfolio;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Portfolio.prototype, "desktopImageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Portfolio.prototype, "mobileImageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Portfolio.prototype, "projectName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Portfolio.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Portfolio.prototype, "technologies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TeamMemberInfo], default: [] }),
    __metadata("design:type", Array)
], Portfolio.prototype, "teamMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Portfolio.prototype, "websiteUrl", void 0);
exports.Portfolio = Portfolio = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'rostatech_portfolios' })
], Portfolio);
exports.PortfolioSchema = mongoose_1.SchemaFactory.createForClass(Portfolio);
//# sourceMappingURL=portfolio.schema.js.map