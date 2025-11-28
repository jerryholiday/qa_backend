"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const test_result_entity_1 = require("../entities/test-result.entity");
const answer_entity_1 = require("../entities/answer.entity");
const option_entity_1 = require("../entities/option.entity");
const test_result_controller_1 = require("./test-result.controller");
const test_result_service_1 = require("./test-result.service");
let TestResultModule = class TestResultModule {
};
exports.TestResultModule = TestResultModule;
exports.TestResultModule = TestResultModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([test_result_entity_1.TestResult, answer_entity_1.Answer, option_entity_1.Option])],
        controllers: [test_result_controller_1.TestResultController],
        providers: [test_result_service_1.TestResultService],
    })
], TestResultModule);
//# sourceMappingURL=test-result.module.js.map