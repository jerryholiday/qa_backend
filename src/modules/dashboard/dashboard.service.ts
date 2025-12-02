import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionnaireDocument } from '../../schemas/questionnaire.schema';
import { TestResultDocument } from '../../schemas/test-result.schema';
import { QuestionDocument } from '../../schemas/question.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Questionnaire')
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
    @InjectModel('TestResult')
    private readonly testResultModel: Model<TestResultDocument>,
    @InjectModel('Question')
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  // 获取仪表盘统计数据
  async getDashboardStats() {
    // 总测试数量（问卷数量）
    const totalQuestionnaires = await this.questionnaireModel
      .countDocuments()
      .exec();

    // 总测试次数（测试结果数量）
    const totalTestResults = await this.testResultModel.countDocuments().exec();

    // 总题目数量
    const totalQuestions = await this.questionModel.countDocuments().exec();

    // 今日测试人数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayResults = await this.testResultModel
      .find({ createdAt: { $gte: today } })
      .exec();
    const uniqueUsersToday = new Set(
      todayResults.map((result) => result.userId),
    );
    const totalUsersToday = uniqueUsersToday.size;

    // 近6个月的测试趋势
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 按月份分组统计测试结果数量
    const monthlyResults = await this.testResultModel
      .aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();

    // 生成近6个月的月份名称数组
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月'];
    const currentMonth = new Date().getMonth();
    const lastSixMonths: string[] = [];
    const testCounts = new Array(6).fill(0);

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      lastSixMonths.push(monthNames[monthIndex]);
    }

    // 将数据库查询结果映射到对应的月份
    monthlyResults.forEach((result) => {
      // 转换为1-12的月份为0-11的索引
      const monthIndex = result._id - 1;
      // 找到该月份在近6个月中的位置
      const position = lastSixMonths.indexOf(monthNames[monthIndex]);
      if (position !== -1) {
        testCounts[position] = result.count;
      }
    });

    // 创建近6个月测试趋势数据
    const recentTests = lastSixMonths.map((month, index) => ({
      month,
      count: testCounts[index],
    }));

    return {
      totalQuestionnaires,
      totalTestResults,
      totalQuestions,
      totalUsersToday,
      recentTests,
    };
  }
}
