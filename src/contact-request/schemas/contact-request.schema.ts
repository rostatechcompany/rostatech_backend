import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactRequestDocument = ContactRequest & Document;

@Schema({ timestamps: true, collection: 'contact_requests' })
export class ContactRequest {
  @Prop({ required: true, trim: true, index: true })
  fullName!: string;

  @Prop({ required: true, trim: true })
  businessName!: string;

  @Prop({ required: true, trim: true })
  activityField!: string;

  @Prop({ type: String, default: null, nullable: true })
  website!: string | null;

  @Prop({ required: true, trim: true, index: true })
  phoneNumber!: string;
}

export const ContactRequestSchema = SchemaFactory.createForClass(ContactRequest);