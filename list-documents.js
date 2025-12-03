// 列出问卷集合中的所有文档
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

async function listQuestionnaireDocuments() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // 连接数据库
    await client.connect();
    console.log('MongoDB连接成功');

    // 选择test数据库和questionnaires集合
    const database = client.db('test');
    const questionnaires = database.collection('questionnaires');

    // 获取所有文档
    const documents = await questionnaires.find({}).toArray();
    
    console.log(`questionnaires集合中有 ${documents.length} 条记录:`);
    documents.forEach((doc, index) => {
      console.log(`\n记录 ${index + 1}:`);
      console.log(`ID: ${doc._id} (类型: ${typeof doc._id})`);
      console.log(`标题: ${doc.title}`);
      console.log(`分类ID: ${doc.category}`);
    });

  } catch (error) {
    console.error('列出文档时出错:', error);
  } finally {
    // 断开连接
    await client.close();
    console.log('MongoDB连接已断开');
  }
}

// 执行列出操作
listQuestionnaireDocuments();