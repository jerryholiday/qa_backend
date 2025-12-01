import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TestResultDocument = TestResult & Document;

@Schema({
  timestamps: true,
})
export class TestResult {
  @Prop()
  userId: string;

  @Prop({ required: true })
  totalScore: number;

  @Prop()
  resultText: string;

  @Prop({ type: Types.ObjectId, ref: 'Questionnaire' })
  questionnaire: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    default: [],
  })
  answers: Types.ObjectId[];
}

export const TestResultSchema = SchemaFactory.createForClass(TestResult);
