import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema({ timestamps: true, collection: 'newlatters' })
export class Newsletter {
  @Prop({ required: true, unique: true })
  phoneNumber!: string;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);