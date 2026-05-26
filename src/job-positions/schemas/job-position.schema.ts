import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobPositionDocument = JobPosition & Document;

export enum PositionType {
  COOPERATION_TYPE = 'cooperation_type',  
  JOB_TITLE = 'job_title',            
}

@Schema({ timestamps: true })
export class JobPosition {
  @Prop({ required: true })
  title!: string;

  @Prop({ 
    required: true, 
    enum: PositionType 
  })
  type!: PositionType;

  @Prop({ default: true })
  isActive!: boolean;
}

export const JobPositionSchema = SchemaFactory.createForClass(JobPosition);