// 使用MongoDB原生驱动清理脏数据
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

async function cleanDirtyData() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // 连接数据库
    await client.connect();
    console.log('MongoDB连接成功');

    // 选择数据库和集合
    const database = client.db('qa'); // 假设数据库名为qa
    const questionnaires = database.collection('questionnaires');

    // 查找并删除_id为"性格测试"的脏数据
    const result = await questionnaires.deleteOne({
      _id: "性格测试" // 直接使用字符串_id查找，不进行类型转换
    });

    console.log(`脏数据清理结果: 删除了 ${result.deletedCount} 条记录`);

  } catch (error) {
    console.error('清理脏数据时出错:', error);
  } finally {
    // 断开连接
    await client.close();
    console.log('MongoDB连接已断开');
  }
}

// 执行清理操作
cleanDirtyData();