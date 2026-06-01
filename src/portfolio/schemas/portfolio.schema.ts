import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class TeamMemberInfo {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TeamMember', required: true })
  memberId!: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  position!: string;
}

@Schema({ timestamps: true, collection: 'rostatech_portfolios'})
export class Portfolio {
  @Prop({ required: true })
  desktopImageUrl!: string;

  @Prop({ required: true })
  mobileImageUrl!: string;

  @Prop({ required: true })
  projectName!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: [String], required: true })
  technologies!: string[];

  @Prop({ type: [TeamMemberInfo], default: [] })
  teamMembers!: TeamMemberInfo[];

  @Prop()
  websiteUrl!: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);