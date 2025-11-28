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
exports.QuestionnaireService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const questionnaire_entity_1 = require("../entities/questionnaire.entity");
const question_entity_1 = require("../entities/question.entity");
const category_entity_1 = require("../entities/category.entity");
let QuestionnaireService = class QuestionnaireService {
    questionnaireRepository;
    questionRepository;
    categoryRepository;
    constructor(questionnaireRepository, questionRepository, categoryRepository) {
        this.questionnaireRepository = questionnaireRepository;
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        return this.questionnaireRepository.find({
            relations: ['category', 'questions'],
        });
    }
    async findOne(id) {
        return this.questionnaireRepository.findOne({
            where: { id },
            relations: ['category', 'questions', 'questions.options'],
        });
    }
    async create(title, description, coverImage, categoryId, totalQuestions) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        const questionnaire = this.questionnaireRepository.create({
            title,
            description,
            coverImage,
            totalQuestions,
            category: category || { id: categoryId },
        });
        return this.questionnaireRepository.save(questionnaire);
    }
    async update(id, title, description, coverImage, categoryId, totalQuestions, isActive) {
        const questionnaire = await this.findOne(id);
        if (!questionnaire)
            return undefined;
        if (title)
            questionnaire.title = title;
        if (description !== undefined)
            questionnaire.description = description;
        if (coverImage)
            questionnaire.coverImage = coverImage;
        if (categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryId },
            });
            if (category)
                questionnaire.category = category;
        }
        if (totalQuestions !== undefined)
            questionnaire.totalQuestions = totalQuestions;
        if (isActive !== undefined)
            questionnaire.isActive = isActive;
        return this.questionnaireRepository.save(questionnaire);
    }
    async remove(id) {
        const result = await this.questionnaireRepository.delete(id);
        return (result.affected !== null &&
            result.affected !== undefined &&
            result.affected > 0);
    }
    async getActiveQuestionnaires() {
        return this.questionnaireRepository.find({
            where: { isActive: true },
            relations: ['category'],
        });
    }
};
exports.QuestionnaireService = QuestionnaireService;
exports.QuestionnaireService = QuestionnaireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(questionnaire_entity_1.Questionnaire)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionnaireService);
//# sourceMappingURL=questionnaire.service.js.map