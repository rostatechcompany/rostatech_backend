import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CooperationTypeDocument = CooperationType & Document;

@Schema({ timestamps: true, collection: 'rostatech_cooperationtypes' })
export class CooperationType {
  @Prop({ required: true, unique: true })
  title!: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const CooperationTypeSchema = SchemaFactory.createForClass(CooperationType);