import mongoose from 'mongoose';
import { seedData } from './seedData';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function runMigration() {
  try {
    console.log('连接到数据库...');
    console.log('使用的MongoDB URI:', process.env.MONGODB_URI);

    // 连接到MongoDB (使用环境变量中的远程数据库)
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/qa_app',
      {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      },
    );
    const connection = mongoose.connection;

    console.log('数据库连接成功');

    // 执行数据导入
    await seedData(connection);

    // 断开连接
    await mongoose.disconnect();

    console.log('迁移完成！');
  } catch (error) {
    console.error('迁移失败:', error);
    process.exit(1);
  }
}

runMigration();
