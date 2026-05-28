import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type JobApplicationDocument = JobApplication & Document;

@Schema({ timestamps: true })
export class JobApplication {
  // Personal Information
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  birthDate!: string; // Persian date format (year/month/day)

  @Prop({ required: true })
  address!: string;

  // Education & Skills
  @Prop({ required: true })
  degree!: string; 

  @Prop({ required: true })
  university!: string; 

  @Prop({ required: true })
  skills!: string; 

  // Work Experience & Portfolio
  @Prop({ required: true })
  workExperience!: string; 

  @Prop({ required: true })
  portfolio!: string; 

  @Prop({ required: true })
  jobTitle!: string;

  @Prop({ type: [String], required: true })
  cooperationTypes?: string[];

  // Application status for admin
  @Prop({ 
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected'] 
  })
  status!: string;

  // Admin notes
  @Prop()
  adminNotes!: string;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);