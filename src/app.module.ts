import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Questionnaire } from './entities/questionnaire.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { TestResult } from './entities/test-result.entity';
import { Answer } from './entities/answer.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionModule } from './question/question.module';
import { TestResultModule } from './test-result/test-result.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Category,
        Questionnaire,
        Question,
        Option,
        TestResult,
        Answer,
      ],
      synchronize: true, // Only use in development
      logging: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Category,
      Questionnaire,
      Question,
      Option,
      TestResult,
      Answer,
    ]),
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
