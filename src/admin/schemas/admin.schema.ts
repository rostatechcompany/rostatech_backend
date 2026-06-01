import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export enum AdminStatus {
  PENDING = 'pending', 
  REJECTED = 'rejected',
  ACTIVE = 'active',
}

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ 
    type: String, 
    enum: AdminRole, 
    default: AdminRole.ADMIN 
  })
  role!: AdminRole;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;

  @Prop({ 
    type: String, 
    enum: AdminStatus, 
    default: AdminStatus.PENDING 
  })
  status!: AdminStatus;

  @Prop()
  currentJti?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);