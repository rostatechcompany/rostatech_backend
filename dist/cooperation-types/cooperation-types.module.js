"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooperationTypesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cooperation_types_service_1 = require("./cooperation-types.service");
const cooperation_types_controller_1 = require("./cooperation-types.controller");
const cooperation_type_schema_1 = require("./schemas/cooperation-type.schema");
let CooperationTypesModule = class CooperationTypesModule {
};
exports.CooperationTypesModule = CooperationTypesModule;
exports.CooperationTypesModule = CooperationTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cooperation_type_schema_1.CooperationType.name, schema: cooperation_type_schema_1.CooperationTypeSchema }])
        ],
        controllers: [cooperation_types_controller_1.CooperationTypesController],
        providers: [cooperation_types_service_1.CooperationTypesService],
        exports: [cooperation_types_service_1.CooperationTypesService],
    })
], CooperationTypesModule);
//# sourceMappingURL=cooperation-types.module.js.map