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
exports.CooperationTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cooperation_types_service_1 = require("./cooperation-types.service");
let CooperationTypesController = class CooperationTypesController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPublic() {
        return this.service.findActive();
    }
};
exports.CooperationTypesController = CooperationTypesController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CooperationTypesController.prototype, "getPublic", null);
exports.CooperationTypesController = CooperationTypesController = __decorate([
    (0, swagger_1.ApiTags)('Cooperation Types'),
    (0, common_1.Controller)('cooperation-types'),
    __metadata("design:paramtypes", [cooperation_types_service_1.CooperationTypesService])
], CooperationTypesController);
//# sourceMappingURL=cooperation-types.controller.js.map