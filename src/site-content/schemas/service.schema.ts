import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop()
  imageUrl!: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);