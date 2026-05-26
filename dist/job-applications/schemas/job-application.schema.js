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
exports.JobApplicationSchema = exports.JobApplication = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let JobApplication = class JobApplication {
    fullName;
    phoneNumber;
    email;
    birthDate;
    address;
    degree;
    university;
    skills;
    workExperience;
    portfolio;
    cooperationType;
    jobTitle;
    status;
    adminNotes;
};
exports.JobApplication = JobApplication;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "birthDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "degree", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "university", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "workExperience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "portfolio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'JobPosition',
        required: true
    }),
    __metadata("design:type", String)
], JobApplication.prototype, "cooperationType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'JobPosition',
        required: true
    }),
    __metadata("design:type", String)
], JobApplication.prototype, "jobTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected']
    }),
    __metadata("design:type", String)
], JobApplication.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "adminNotes", void 0);
exports.JobApplication = JobApplication = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], JobApplication);
exports.JobApplicationSchema = mongoose_1.SchemaFactory.createForClass(JobApplication);
//# sourceMappingURL=job-application.schema.js.map