"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_applications_service_1 = require("./job-applications.service");
const job_applications_controller_1 = require("./job-applications.controller");
const job_application_schema_1 = require("./schemas/job-application.schema");
const job_position_schema_1 = require("../job-positions/schemas/job-position.schema");
let JobApplicationsModule = class JobApplicationsModule {
};
exports.JobApplicationsModule = JobApplicationsModule;
exports.JobApplicationsModule = JobApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: job_application_schema_1.JobApplication.name, schema: job_application_schema_1.JobApplicationSchema },
                { name: job_position_schema_1.JobPosition.name, schema: job_position_schema_1.JobPositionSchema },
            ]),
        ],
        controllers: [job_applications_controller_1.JobApplicationsController],
        providers: [job_applications_service_1.JobApplicationsService],
    })
], JobApplicationsModule);
//# sourceMappingURL=job-applications.module.js.map