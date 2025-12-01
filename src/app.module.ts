import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { QuestionModule } from './modules/question/question.module';
import { TestResultModule } from './modules/test-result/test-result.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/qa-system',
      {
        retryAttempts: 5,
        retryDelay: 3000,
      },
    ),
    AuthModule,
    CategoryModule,
    QuestionnaireModule,
    QuestionModule,
    TestResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
