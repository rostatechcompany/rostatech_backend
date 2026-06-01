import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AboutPageDocument = AboutPage & Document;

@Schema({ timestamps: true })
export class AboutPage {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  delta: any;   // Quill Delta

  @Prop()
  coverImageUrl!: string;

  @Prop({ default: true })
  isActive?: boolean;
}

export const AboutPageSchema = SchemaFactory.createForClass(AboutPage);