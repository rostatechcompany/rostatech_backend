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
exports.CreatePortfolioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePortfolioDto {
    desktopImageUrl;
    mobileImageUrl;
    projectName;
    description;
    technologies;
    websiteUrl;
    teamMemberIds;
}
exports.CreatePortfolioDto = CreatePortfolioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/desktop.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePortfolioDto.prototype, "desktopImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/mobile.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePortfolioDto.prototype, "mobileImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'پروژه فروشگاهی' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePortfolioDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'توضیحات کامل پروژه...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePortfolioDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['React', 'Node.js', 'MongoDB'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePortfolioDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://project-website.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePortfolioDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['60d5f484f1a2c8b1f8e4e1a1', '60d5f484f1a2c8b1f8e4e1a2'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreatePortfolioDto.prototype, "teamMemberIds", void 0);
//# sourceMappingURL=create-portfolio.dto.js.map