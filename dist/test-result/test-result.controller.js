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
exports.TestResultController = void 0;
const common_1 = require("@nestjs/common");
const test_result_service_1 = require("./test-result.service");
let TestResultController = class TestResultController {
    testResultService;
    constructor(testResultService) {
        this.testResultService = testResultService;
    }
    async getAllTestResults(res) {
        const testResults = await this.testResultService.findAll();
        return res.json(testResults);
    }
    async getTestResultById(id, res) {
        const testResult = await this.testResultService.findOne(parseInt(id));
        if (!testResult) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Test result not found' });
        }
        return res.json(testResult);
    }
    async getTestResultsByUserId(userId, res) {
        const testResults = await this.testResultService.findByUserId(userId);
        return res.json(testResults);
    }
    async submitTest(body, res) {
        const { userId, questionnaireId, answers } = body;
        const testResult = await this.testResultService.submitTest(userId, questionnaireId, answers);
        return res.status(common_1.HttpStatus.CREATED).json(testResult);
    }
};
exports.TestResultController = TestResultController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestResultController.prototype, "getAllTestResults", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestResultController.prototype, "getTestResultById", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestResultController.prototype, "getTestResultsByUserId", null);
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestResultController.prototype, "submitTest", null);
exports.TestResultController = TestResultController = __decorate([
    (0, common_1.Controller)('api/test-results'),
    __metadata("design:paramtypes", [test_result_service_1.TestResultService])
], TestResultController);
//# sourceMappingURL=test-result.controller.js.map