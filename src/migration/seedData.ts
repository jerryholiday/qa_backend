import { Connection } from 'mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import {
  Questionnaire,
  QuestionnaireSchema,
} from '../schemas/questionnaire.schema';
import { Question, QuestionSchema } from '../schemas/question.schema';
import { Option, OptionSchema } from '../schemas/option.schema';
import { User, UserSchema } from '../schemas/user.schema';

// 前端写死的测试数据
const mockTests = [
  {
    id: 1,
    title: 'MBTI性格测试',
    description: '了解你的MBTI性格类型，探索职业发展方向',
    questionsCount: 20,
    category: { id: 1, name: '性格分析' },
    questions: [
      {
        id: 1,
        text: '在社交场合中，你更倾向于：',
        type: 'radio',
        options: [
          { id: 1, text: '主动与他人交流', value: 10 },
          { id: 2, text: '等待他人主动交流', value: 0 },
        ],
      },
      {
        id: 2,
        text: '做决定时，你更依赖：',
        type: 'radio',
        options: [
          { id: 3, text: '理性分析和逻辑', value: 10 },
          { id: 4, text: '直觉和个人感受', value: 0 },
        ],
      },
      {
        id: 3,
        text: '你更喜欢哪种工作环境：',
        type: 'radio',
        options: [
          { id: 5, text: '有明确的规则和结构', value: 10 },
          { id: 6, text: '灵活自由，充满变化', value: 0 },
        ],
      },
      {
        id: 4,
        text: '你通常如何规划你的时间：',
        type: 'radio',
        options: [
          { id: 7, text: '提前详细规划', value: 10 },
          { id: 8, text: '随遇而安，灵活调整', value: 0 },
        ],
      },
      {
        id: 5,
        text: '当遇到问题时，你更倾向于：',
        type: 'radio',
        options: [
          { id: 9, text: '独立思考解决', value: 10 },
          { id: 10, text: '寻求他人帮助', value: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '大五人格测试',
    description: '从五个维度评估你的人格特质',
    questionsCount: 25,
    category: { id: 1, name: '性格分析' },
  },
  {
    id: 3,
    title: '职业性格测试',
    description: '找到最适合你的职业方向',
    questionsCount: 30,
    category: { id: 2, name: '职业规划' },
  },
  {
    id: 4,
    title: '情绪智商测试',
    description: '评估你的情绪管理能力和社交技能',
    questionsCount: 15,
    category: { id: 3, name: '情绪管理' },
  },
  {
    id: 5,
    title: '人际关系测试',
    description: '了解你的人际交往风格和沟通能力',
    questionsCount: 20,
    category: { id: 3, name: '情绪管理' },
  },
  {
    id: 6,
    title: '领导能力测试',
    description: '评估你的领导风格和团队管理能力',
    questionsCount: 25,
    category: { id: 2, name: '职业规划' },
  },
];

// 管理页面的问卷数据
const adminQuestionnaires = [
  {
    id: '1',
    title: 'MBTI性格测试',
    description: '通过MBTI测试了解你的性格类型',
    category: '性格测试',
    questionsCount: 30,
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    title: '职业兴趣测试',
    description: '探索适合你的职业方向',
    category: '职业测试',
    questionsCount: 25,
    createdAt: '2023-07-20',
  },
  {
    id: '3',
    title: '情绪管理测试',
    description: '评估你的情绪管理能力',
    category: '心理健康',
    questionsCount: 20,
    createdAt: '2023-08-10',
  },
];

// 管理页面的题目数据
const adminQuestions = [
  {
    id: '1',
    text: '你更倾向于哪种社交方式？',
    type: 'single',
    options: [
      { id: '1', text: '喜欢独自活动，享受安静', score: 1 },
      { id: '2', text: '喜欢与少数亲密朋友交流', score: 2 },
      { id: '3', text: '喜欢参加社交聚会，结识新朋友', score: 3 },
    ],
  },
  {
    id: '2',
    text: '在做决策时，你更依赖于：',
    type: 'single',
    options: [
      { id: '1', text: '逻辑分析和客观事实', score: 1 },
      { id: '2', text: '个人价值观和情感因素', score: 2 },
    ],
  },
  {
    id: '3',
    text: '描述一下你的理想工作环境：',
    type: 'text',
    options: [],
  },
];

export async function seedData(connection: Connection) {
  try {
    console.log('开始导入数据...');

    // 1. 创建模型
    const CategoryModel = connection.model(Category.name, CategorySchema);
    const QuestionnaireModel = connection.model(
      Questionnaire.name,
      QuestionnaireSchema,
    );
    const QuestionModel = connection.model(Question.name, QuestionSchema);
    const OptionModel = connection.model(Option.name, OptionSchema);
    const UserModel = connection.model(User.name, UserSchema);

    // 2. 清空现有数据
    await Promise.all([
      UserModel.deleteMany({}),
      CategoryModel.deleteMany({}),
      QuestionnaireModel.deleteMany({}),
      QuestionModel.deleteMany({}),
      OptionModel.deleteMany({}),
    ]);

    // 3. 创建默认管理员账号
    const adminUser = await UserModel.create({
      username: 'admin',
      password: 'admin123', // 注意：在实际应用中应该使用加密密码
      role: 'admin',
    });
    console.log(`创建管理员账号: ${adminUser.username}`);
    console.log('清空现有数据完成');

    // 4. 创建分类
    const categories: { [key: string]: any } = {};
    const allCategories = [
      ...new Set([
        ...mockTests.map((test) => test.category.name),
        ...adminQuestionnaires.map((q) => q.category),
      ]),
    ];

    for (const categoryName of allCategories) {
      const category = await CategoryModel.create({
        name: categoryName,
        description: `${categoryName}分类`,
      });
      categories[categoryName] = category;
      console.log(`创建分类: ${categoryName}`);
    }

    // 4. 创建问卷和题目
    for (const test of mockTests) {
      // 创建问卷
      const questionnaire = await QuestionnaireModel.create({
        title: test.title,
        description: test.description,
        coverImage: 'https://via.placeholder.com/300',
        totalQuestions: test.questionsCount || 0,
        isActive: true,
        category: categories[test.category.name]._id,
        questions: [],
        testResults: [],
      });
      console.log(`创建问卷: ${test.title}`);

      // 如果有题目，创建题目和选项
      if (test.questions) {
        for (let i = 0; i < test.questions.length; i++) {
          const q = test.questions[i];
          // 创建题目
          const question = await QuestionModel.create({
            content: q.text,
            order: i + 1,
            type: q.type === 'radio' ? 'single' : q.type,
            questionnaire: questionnaire._id,
            options: [],
            answers: [],
          });

          // 创建选项
          if (q.options) {
            for (let j = 0; j < q.options.length; j++) {
              const opt = q.options[j];
              const option = await OptionModel.create({
                content: opt.text,
                value: (opt as any).value || (opt as any).score || 0,
                order: j + 1,
                question: question._id,
                answers: [],
              });
              question.options.push(option._id);
            }
          }

          await question.save();
          questionnaire.questions.push(question._id);
          console.log(`  创建题目: ${q.text}`);
        }
      }

      await questionnaire.save();
    }

    // 5. 导入管理页面的额外问卷
    for (const adminQ of adminQuestionnaires) {
      // 检查是否已存在
      const existing = await QuestionnaireModel.findOne({
        title: adminQ.title,
      });
      if (!existing) {
        const categoryName = adminQ.category;
        const category =
          categories[categoryName] ||
          (await CategoryModel.create({
            name: categoryName,
            description: `${categoryName}分类`,
          }));

        const questionnaire = await QuestionnaireModel.create({
          title: adminQ.title,
          description: adminQ.description,
          coverImage: 'https://via.placeholder.com/300',
          totalQuestions: adminQ.questionsCount,
          isActive: true,
          category: category._id,
          questions: [],
          testResults: [],
        });
        console.log(`创建额外问卷: ${adminQ.title}`);
      }
    }

    console.log('数据导入完成！');
  } catch (error) {
    console.error('数据导入失败:', error);
    throw error;
  }
}
