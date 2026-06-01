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
exports.AdminSchema = exports.Admin = exports.AdminStatus = exports.AdminRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var AdminRole;
(function (AdminRole) {
    AdminRole["SUPER_ADMIN"] = "super_admin";
    AdminRole["ADMIN"] = "admin";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
var AdminStatus;
(function (AdminStatus) {
    AdminStatus["PENDING"] = "pending";
    AdminStatus["REJECTED"] = "rejected";
    AdminStatus["ACTIVE"] = "active";
})(AdminStatus || (exports.AdminStatus = AdminStatus = {}));
let Admin = class Admin {
    username;
    password;
    fullName;
    role;
    isActive;
    status;
    currentJti;
};
exports.Admin = Admin;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Admin.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: AdminRole,
        default: AdminRole.ADMIN
    }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: AdminStatus,
        default: AdminStatus.PENDING
    }),
    __metadata("design:type", String)
], Admin.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admin.prototype, "currentJti", void 0);
exports.Admin = Admin = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Admin);
exports.AdminSchema = mongoose_1.SchemaFactory.createForClass(Admin);
//# sourceMappingURL=admin.schema.js.map