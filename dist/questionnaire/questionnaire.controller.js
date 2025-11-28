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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireController = void 0;
const common_1 = require("@nestjs/common");
const questionnaire_service_1 = require("./questionnaire.service");
let QuestionnaireController = class QuestionnaireController {
    questionnaireService;
    constructor(questionnaireService) {
        this.questionnaireService = questionnaireService;
    }
    async getAllQuestionnaires(res) {
        const questionnaires = await this.questionnaireService.findAll();
        return res.json(questionnaires);
    }
    async getActiveQuestionnaires(res) {
        const questionnaires = await this.questionnaireService.getActiveQuestionnaires();
        return res.json(questionnaires);
    }
    async getQuestionnaireById(id, res) {
        const questionnaire = await this.questionnaireService.findOne(parseInt(id));
        if (!questionnaire) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
        }
        return res.json(questionnaire);
    }
    async createQuestionnaire(body, res) {
        const { title, description, coverImage, categoryId, totalQuestions } = body;
        const questionnaire = await this.questionnaireService.create(title, description, coverImage, categoryId, totalQuestions);
        return res.status(common_1.HttpStatus.CREATED).json(questionnaire);
    }
    async updateQuestionnaire(id, body, res) {
        const { title, description, coverImage, categoryId, totalQuestions, isActive } = body;
        const questionnaire = await this.questionnaireService.update(parseInt(id), title, description, coverImage, categoryId, totalQuestions, isActive);
        if (!questionnaire) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
        }
        return res.json(questionnaire);
    }
    async deleteQuestionnaire(id, res) {
        const result = await this.questionnaireService.remove(parseInt(id));
        if (!result) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
        }
        return res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.QuestionnaireController = QuestionnaireController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "getAllQuestionnaires", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "getActiveQuestionnaires", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "getQuestionnaireById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "createQuestionnaire", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "updateQuestionnaire", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "deleteQuestionnaire", null);
exports.QuestionnaireController = QuestionnaireController = __decorate([
    (0, common_1.Controller)('api/questionnaires'),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService])
], QuestionnaireController);
//# sourceMappingURL=questionnaire.controller.js.map