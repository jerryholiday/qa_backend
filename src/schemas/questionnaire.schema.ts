import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema({
  timestamps: true,
})
export class Questionnaire {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    default: [],
  })
  questions: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'TestResult' }],
    default: [],
  })
  testResults: Types.ObjectId[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
