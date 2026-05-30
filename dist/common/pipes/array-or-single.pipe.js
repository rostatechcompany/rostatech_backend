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
exports.ArrayOrSinglePipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ArrayOrSinglePipe = class ArrayOrSinglePipe {
    dtoClass;
    constructor(dtoClass) {
        this.dtoClass = dtoClass;
    }
    async transform(value, _metadata) {
        if (Array.isArray(value)) {
            const items = (0, class_transformer_1.plainToInstance)(this.dtoClass, value);
            const errorsArray = await Promise.all(items.map((item) => (0, class_validator_1.validate)(item)));
            const hasError = errorsArray.some((err) => err.length > 0);
            if (hasError) {
                throw new common_1.BadRequestException('برخی از آیتم‌های آرایه معتبر نیستند');
            }
            return items;
        }
        const instance = (0, class_transformer_1.plainToInstance)(this.dtoClass, value);
        const errors = await (0, class_validator_1.validate)(instance);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        return instance;
    }
};
exports.ArrayOrSinglePipe = ArrayOrSinglePipe;
exports.ArrayOrSinglePipe = ArrayOrSinglePipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], ArrayOrSinglePipe);
//# sourceMappingURL=array-or-single.pipe.js.map