import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true, collection: 'clients' })
export class Client {
  @Prop({ required: true })
  logoUrl!: string;

  @Prop({ required: true })
  companyName!: string;

  @Prop()
  collaborationDate!: string; // می‌تواند جلالی یا بازه باشد

  @Prop()
  websiteUrl!: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);