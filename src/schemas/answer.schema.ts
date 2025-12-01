import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema({
  timestamps: true,
})
export class Answer {
  @Prop({ type: Types.ObjectId, ref: 'TestResult' })
  testResult: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Option' })
  option: Types.ObjectId;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
