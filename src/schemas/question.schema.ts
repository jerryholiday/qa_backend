import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true }) // 'single' or 'multiple'
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Questionnaire' })
  questionnaire: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Option' }],
    default: [],
  })
  options: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    default: [],
  })
  answers: Types.ObjectId[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
