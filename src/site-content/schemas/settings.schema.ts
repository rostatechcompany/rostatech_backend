import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class SocialLink {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  url!: string;
}
export class TextSection {
  @Prop({ required: true })
  key!: string; // e.g., 'about_us', 'vision', 'mission'

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ type: String, })
  image!: string;
}

@Schema({ timestamps: true })
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

  @Prop({ type: [TextSection] })
  textSections!: TextSection[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
export const TextSectionSchema = SchemaFactory.createForClass(TextSection);