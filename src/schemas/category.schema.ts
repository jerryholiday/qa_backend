import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Questionnaire' }],
    default: [],
  })
  questionnaires: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
