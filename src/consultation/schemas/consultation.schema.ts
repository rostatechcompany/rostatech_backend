import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsultationDocument = Consultation & Document;

@Schema({ timestamps: true, collection: 'rostatech_consultations' })
export class Consultation {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  email?: string;

  @Prop({ required: true })
  subject!: string;

  @Prop({ required: true })
  message?: string;

  @Prop({ default: 'pending', enum: ['pending', 'answered', 'closed'] })
  status!: string;

  @Prop()
  adminNotes!: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);