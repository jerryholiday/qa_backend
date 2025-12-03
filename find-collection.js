// 查找问卷集合位置脚本
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

async function findQuestionnaireCollection() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // 连接数据库
    await client.connect();
    console.log('MongoDB连接成功');

    // 获取所有数据库名称
    const databases = await client.db().admin().listDatabases();
    console.log('所有数据库:', databases.databases.map(db => db.name));

    // 遍历每个数据库，查找问卷相关集合
    for (const db of databases.databases) {
      console.log(`\n检查数据库: ${db.name}`);
      const database = client.db(db.name);
      const collections = await database.listCollections().toArray();
      console.log('集合列表:', collections.map(col => col.name));
      
      // 查找可能的问卷集合
      const questionnaireCollections = collections.filter(col => 
        col.name.includes('questionnaire') || col.name.includes('survey')
      );
      
      if (questionnaireCollections.length > 0) {
        console.log('找到可能的问卷集合:', questionnaireCollections.map(col => col.name));
        
        // 检查每个可能的问卷集合是否有脏数据
        for (const collection of questionnaireCollections) {
          const coll = database.collection(collection.name);
          const count = await coll.countDocuments({ _id: "性格测试" });
          console.log(`${collection.name}集合中脏数据数量: ${count}`);
        }
      }
    }

  } catch (error) {
    console.error('查找集合时出错:', error);
  } finally {
    // 断开连接
    await client.close();
    console.log('MongoDB连接已断开');
  }
}

// 执行查找操作
findQuestionnaireCollection();