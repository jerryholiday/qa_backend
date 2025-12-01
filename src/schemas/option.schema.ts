import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OptionDocument = Option & Document;

@Schema({
  timestamps: true,
})
export class Option {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  order: number;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    default: [],
  })
  answers: Types.ObjectId[];
}

export const OptionSchema = SchemaFactory.createForClass(Option);
