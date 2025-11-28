"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const category_entity_1 = require("./entities/category.entity");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
const question_entity_1 = require("./entities/question.entity");
const option_entity_1 = require("./entities/option.entity");
const test_result_entity_1 = require("./entities/test-result.entity");
const answer_entity_1 = require("./entities/answer.entity");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
const questionnaire_module_1 = require("./questionnaire/questionnaire.module");
const question_module_1 = require("./question/question.module");
const test_result_module_1 = require("./test-result/test-result.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306'),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    user_entity_1.User,
                    category_entity_1.Category,
                    questionnaire_entity_1.Questionnaire,
                    question_entity_1.Question,
                    option_entity_1.Option,
                    test_result_entity_1.TestResult,
                    answer_entity_1.Answer,
                ],
                synchronize: true,
                logging: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                category_entity_1.Category,
                questionnaire_entity_1.Questionnaire,
                question_entity_1.Question,
                option_entity_1.Option,
                test_result_entity_1.TestResult,
                answer_entity_1.Answer,
            ]),
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            questionnaire_module_1.QuestionnaireModule,
            question_module_1.QuestionModule,
            test_result_module_1.TestResultModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map