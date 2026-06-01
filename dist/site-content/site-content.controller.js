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
exports.SiteContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const site_content_service_1 = require("./site-content.service");
let SiteContentController = class SiteContentController {
    service;
    constructor(service) {
        this.service = service;
    }
    getTeam() {
        return this.service.getTeam();
    }
    getClients() {
        return this.service.getClients();
    }
    getServices() {
        return this.service.getServices();
    }
    getSettings() {
        return this.service.getSettings();
    }
    getAboutPage() {
        return this.service.getAboutPagePublic();
    }
};
exports.SiteContentController = SiteContentController;
__decorate([
    (0, common_1.Get)('team'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteContentController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Get)('clients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteContentController.prototype, "getClients", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteContentController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteContentController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Get)('about'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteContentController.prototype, "getAboutPage", null);
exports.SiteContentController = SiteContentController = __decorate([
    (0, swagger_1.ApiTags)('Site Content'),
    (0, common_1.Controller)('site-content'),
    __metadata("design:paramtypes", [site_content_service_1.SiteContentService])
], SiteContentController);
//# sourceMappingURL=site-content.controller.js.map