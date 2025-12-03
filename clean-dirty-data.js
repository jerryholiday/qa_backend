// 清理问卷中的脏数据脚本
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 问卷Schema定义
const questionnaireSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String,
  totalQuestions: Number,
  isActive: Boolean,
  category: mongoose.Schema.Types.ObjectId,
  questions: [mongoose.Schema.Types.ObjectId],
  testResults: [mongoose.Schema.Types.ObjectId],
  createdAt: Date,
  updatedAt: Date
});

// 创建模型
const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

async function cleanDirtyData() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB连接成功');
    
    // 查找并删除_id为"性格测试"的脏数据
    const result = await Questionnaire.deleteOne({
      _id: "性格测试" // 直接使用字符串_id查找
    });
    
    console.log(`脏数据清理结果: 删除了 ${result.deletedCount} 条记录`);
    
    // 断开连接
    await mongoose.disconnect();
    console.log('MongoDB连接已断开');
  } catch (error) {
    console.error('清理脏数据时出错:', error);
    await mongoose.disconnect();
  }
}

// 执行清理操作
cleanDirtyData();