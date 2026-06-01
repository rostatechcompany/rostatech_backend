"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteContentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const settings_schema_1 = require("./schemas/settings.schema");
const team_member_schema_1 = require("./schemas/team-member.schema");
const client_schema_1 = require("./schemas/client.schema");
const service_schema_1 = require("./schemas/service.schema");
const site_content_service_1 = require("./site-content.service");
const site_content_controller_1 = require("./site-content.controller");
const auth_module_1 = require("../auth/auth.module");
const upload_module_1 = require("../upload/upload.module");
const about_page_schema_1 = require("./schemas/about-page.schema");
let SiteContentModule = class SiteContentModule {
};
exports.SiteContentModule = SiteContentModule;
exports.SiteContentModule = SiteContentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: settings_schema_1.Settings.name, schema: settings_schema_1.SettingsSchema },
                { name: team_member_schema_1.TeamMember.name, schema: team_member_schema_1.TeamMemberSchema },
                { name: client_schema_1.Client.name, schema: client_schema_1.ClientSchema },
                { name: service_schema_1.Service.name, schema: service_schema_1.ServiceSchema },
                { name: about_page_schema_1.AboutPage.name, schema: about_page_schema_1.AboutPageSchema },
            ]),
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
        ],
        controllers: [site_content_controller_1.SiteContentController, site_content_controller_1.SiteContentController],
        providers: [site_content_service_1.SiteContentService],
        exports: [site_content_service_1.SiteContentService],
    })
], SiteContentModule);
//# sourceMappingURL=site-content.module.js.map