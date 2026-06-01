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
exports.SettingsSchema = exports.Settings = exports.SocialLink = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SocialLink = class SocialLink {
    name;
    url;
};
exports.SocialLink = SocialLink;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SocialLink.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SocialLink.prototype, "url", void 0);
exports.SocialLink = SocialLink = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SocialLink);
let Settings = class Settings {
    address;
    shortDescription;
    phoneNumbers;
    socialLinks;
    projectsCount;
    satisfactionRate;
    partnerCompaniesCount;
};
exports.Settings = Settings;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Settings.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Settings.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Settings.prototype, "phoneNumbers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ name: String, url: String }] }),
    __metadata("design:type", Array)
], Settings.prototype, "socialLinks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Settings.prototype, "projectsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Settings.prototype, "satisfactionRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Settings.prototype, "partnerCompaniesCount", void 0);
exports.Settings = Settings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Settings);
exports.SettingsSchema = mongoose_1.SchemaFactory.createForClass(Settings);
//# sourceMappingURL=settings.schema.js.map