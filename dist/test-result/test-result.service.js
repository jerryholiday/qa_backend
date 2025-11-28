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
exports.TestResultService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const test_result_entity_1 = require("../entities/test-result.entity");
const answer_entity_1 = require("../entities/answer.entity");
const option_entity_1 = require("../entities/option.entity");
let TestResultService = class TestResultService {
    testResultRepository;
    answerRepository;
    optionRepository;
    constructor(testResultRepository, answerRepository, optionRepository) {
        this.testResultRepository = testResultRepository;
        this.answerRepository = answerRepository;
        this.optionRepository = optionRepository;
    }
    async findAll() {
        return this.testResultRepository.find({
            relations: ['questionnaire', 'answers', 'answers.question', 'answers.option'],
        });
    }
    async findOne(id) {
        return this.testResultRepository.findOne({
            where: { id },
            relations: ['answers', 'answers.option', 'answers.option.question', 'user'],
        });
    }
    async findByUserId(userId) {
        return this.testResultRepository.find({
            where: { userId },
            relations: ['questionnaire'],
        });
    }
    async submitTest(userId, questionnaireId, answers) {
        let totalScore = 0;
        for (const answer of answers) {
            const option = await this.optionRepository.findOne({ where: { id: answer.optionId } });
            if (option) {
                totalScore += option.value;
            }
        }
        let resultText = '';
        if (totalScore < 50) {
            resultText = '低分组：你具有内向、谨慎的性格特点。';
        }
        else if (totalScore < 100) {
            resultText = '中分组：你具有平衡、适中的性格特点。';
        }
        else {
            resultText = '高分组：你具有外向、积极的性格特点。';
        }
        const testResult = this.testResultRepository.create({
            userId,
            totalScore,
            resultText,
            questionnaire: { id: questionnaireId },
        });
        const savedTestResult = await this.testResultRepository.save(testResult);
        for (const answer of answers) {
            const newAnswer = this.answerRepository.create({
                testResult: savedTestResult,
                question: { id: answer.questionId },
                option: { id: answer.optionId },
            });
            await this.answerRepository.save(newAnswer);
        }
        return savedTestResult;
    }
};
exports.TestResultService = TestResultService;
exports.TestResultService = TestResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(test_result_entity_1.TestResult)),
    __param(1, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __param(2, (0, typeorm_1.InjectRepository)(option_entity_1.Option)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TestResultService);
//# sourceMappingURL=test-result.service.js.map