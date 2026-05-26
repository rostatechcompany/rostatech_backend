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
exports.UpdateAdminDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const admin_schema_1 = require("../schemas/admin.schema");
class UpdateAdminDto {
    username;
    fullName;
    role;
    isActive;
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin_john' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: admin_schema_1.AdminRole, example: admin_schema_1.AdminRole.ADMIN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(admin_schema_1.AdminRole),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAdminDto.prototype, "isActive", void 0);
//# sourceMappingURL=update-admin.dto.js.map