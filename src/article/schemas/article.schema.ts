import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title!: string;

  @Prop({ unique: true, required: true })
  slug!: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  delta: any; // Delta JSON from Quill

  @Prop({ default: '' })
  coverImageUrl!: string;

  @Prop({ default: 3 })
  readingTime!: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Admin', required: true })
  author!: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);