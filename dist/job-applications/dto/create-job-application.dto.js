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
exports.CreateJobApplicationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJobApplicationDto {
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
}
exports.CreateJobApplicationDto = CreateJobApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'نام و نام‌خانوادگی' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09123456789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1370/05/15' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'آدرس' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'کارشناسی ارشد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "degree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'دانشگاه تهران' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "university", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'React, Node.js, MongoDB' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '۵ سال توسعه Frontend در شرکت X' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "workExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://github.com/ali, https://sample.ir' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "portfolio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '60d5f484f1a2c8b1f8e4e1a1' }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "cooperationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '60d5f484f1a2c8b1f8e4e1a2' }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateJobApplicationDto.prototype, "jobTitle", void 0);
//# sourceMappingURL=create-job-application.dto.js.map