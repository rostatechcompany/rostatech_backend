import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema({ timestamps: true ,collection: 'rostatech_teammember'})
export class TeamMember {
  @Prop({ required: true })
  photoUrl!: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  position!: string;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);