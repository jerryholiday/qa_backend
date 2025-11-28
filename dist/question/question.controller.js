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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    questionService;
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getAllQuestions(res) {
        const questions = await this.questionService.findAll();
        return res.json(questions);
    }
    async getQuestionById(id, res) {
        const question = await this.questionService.findOne(parseInt(id));
        if (!question) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
        }
        return res.json(question);
    }
    async getQuestionsByQuestionnaire(questionnaireId, res) {
        const questions = await this.questionService.findByQuestionnaire(parseInt(questionnaireId));
        return res.json(questions);
    }
    async createQuestion(body, res) {
        const { content, order, type, questionnaireId } = body;
        const question = await this.questionService.create(content, order, type, questionnaireId);
        return res.status(common_1.HttpStatus.CREATED).json(question);
    }
    async updateQuestion(id, body, res) {
        const { content, order, type } = body;
        const question = await this.questionService.update(parseInt(id), content, order, type);
        if (!question) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
        }
        return res.json(question);
    }
    async deleteQuestion(id, res) {
        const result = await this.questionService.delete(parseInt(id));
        if (!result) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
        }
        return res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
    async createOption(questionId, body, res) {
        const { content, value, order } = body;
        const option = await this.questionService.createOption(content, value, order, parseInt(questionId));
        return res.status(common_1.HttpStatus.CREATED).json(option);
    }
    async updateOption(optionId, body, res) {
        const { content, value, order } = body;
        const option = await this.questionService.updateOption(parseInt(optionId), content, value, order);
        if (!option) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Option not found' });
        }
        return res.json(option);
    }
    async deleteOption(optionId, res) {
        const result = await this.questionService.deleteOption(parseInt(optionId));
        if (!result) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Option not found' });
        }
        return res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Get)('questionnaire/:questionnaireId'),
    __param(0, (0, common_1.Param)('questionnaireId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestionsByQuestionnaire", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)(':questionId/options'),
    __param(0, (0, common_1.Param)('questionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createOption", null);
__decorate([
    (0, common_1.Put)('options/:optionId'),
    __param(0, (0, common_1.Param)('optionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateOption", null);
__decorate([
    (0, common_1.Delete)('options/:optionId'),
    __param(0, (0, common_1.Param)('optionId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteOption", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('api/questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map