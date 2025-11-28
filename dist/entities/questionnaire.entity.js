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
exports.Questionnaire = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const question_entity_1 = require("./question.entity");
const test_result_entity_1 = require("./test-result.entity");
let Questionnaire = class Questionnaire {
    id;
    title;
    description;
    coverImage;
    totalQuestions;
    isActive;
    category;
    questions;
    testResults;
    createdAt;
    updatedAt;
};
exports.Questionnaire = Questionnaire;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Questionnaire.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Questionnaire.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Questionnaire.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Questionnaire.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Questionnaire.prototype, "totalQuestions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Questionnaire.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.questionnaires),
    __metadata("design:type", category_entity_1.Category)
], Questionnaire.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.questionnaire),
    __metadata("design:type", Array)
], Questionnaire.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_result_entity_1.TestResult, (testResult) => testResult.questionnaire),
    __metadata("design:type", Array)
], Questionnaire.prototype, "testResults", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Questionnaire.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Questionnaire.prototype, "updatedAt", void 0);
exports.Questionnaire = Questionnaire = __decorate([
    (0, typeorm_1.Entity)()
], Questionnaire);
//# sourceMappingURL=questionnaire.entity.js.map