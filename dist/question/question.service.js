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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../entities/question.entity");
const option_entity_1 = require("../entities/option.entity");
let QuestionService = class QuestionService {
    questionRepository;
    optionRepository;
    constructor(questionRepository, optionRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }
    async findAll() {
        return this.questionRepository.find({
            relations: ['options', 'questionnaire'],
        });
    }
    async findOne(id) {
        return this.questionRepository.findOne({
            where: { id },
            relations: ['options', 'questionnaire'],
        });
    }
    async findByQuestionnaire(questionnaireId) {
        return this.questionRepository.find({
            where: { questionnaire: { id: questionnaireId } },
            relations: ['options'],
            order: { order: 'ASC' },
        });
    }
    async create(content, order, type, questionnaireId) {
        const question = this.questionRepository.create({
            content,
            order,
            type,
            questionnaire: { id: questionnaireId },
        });
        return this.questionRepository.save(question);
    }
    async update(id, content, order, type) {
        const question = await this.findOne(id);
        if (!question)
            return undefined;
        if (content)
            question.content = content;
        if (order !== undefined)
            question.order = order;
        if (type)
            question.type = type;
        return this.questionRepository.save(question);
    }
    async delete(id) {
        await this.optionRepository.delete({ question: { id } });
        const result = await this.questionRepository.delete(id);
        return (result.affected !== null &&
            result.affected !== undefined &&
            result.affected > 0);
    }
    async createOption(content, value, order, questionId) {
        const option = this.optionRepository.create({
            content,
            value,
            order,
            question: { id: questionId },
        });
        return this.optionRepository.save(option);
    }
    async updateOption(id, content, value, order) {
        const option = await this.optionRepository.findOne({ where: { id } });
        if (!option)
            return undefined;
        if (content)
            option.content = content;
        if (value !== undefined)
            option.value = value;
        if (order !== undefined)
            option.order = order;
        return this.optionRepository.save(option);
    }
    async deleteOption(id) {
        const result = await this.optionRepository.delete(id);
        return (result.affected !== null &&
            result.affected !== undefined &&
            result.affected > 0);
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(option_entity_1.Option)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionService);
//# sourceMappingURL=question.service.js.map