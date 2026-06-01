import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true, collection: 'rostatech_sociallinks' })
export class SocialLink {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  url!: string;
}

@Schema({ timestamps: true, collection: 'rostatech_settings' })
export class Settings {
  @Prop()
  address!: string;

  @Prop()
  shortDescription!: string;

  @Prop({ type: [String] })
  phoneNumbers!: string[];

  @Prop({ type: [{ name: String, url: String }] })
  socialLinks!: { name: string; url: string }[];

  @Prop({ default: 0 })
  projectsCount!: number;

  @Prop({ default: 0 })
  satisfactionRate!: number; // درصد رضایت

  @Prop({ default: 0 })
  partnerCompaniesCount!: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);