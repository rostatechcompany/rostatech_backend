import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { TeamMember, TeamMemberDocument } from './schemas/team-member.schema';
import { Client, ClientDocument } from './schemas/client.schema';
import { Service, ServiceDocument } from './schemas/service.schema';
import { UpdateSettingsDto } from './dto/settings.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class SiteContentService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
    @InjectModel(TeamMember.name) private teamModel: Model<TeamMemberDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {
    // first init settings
    this.initSettings();
  }

  private async initSettings() {
    const settings = await this.settingsModel.findOne();
    if (!settings) {
      await this.settingsModel.create({});
    }
  }

  // ---------- Settings ----------
  async getSettings() {
    const settings = await this.settingsModel
      .findOne()
      .select('-__v -createdAt -updatedAt')
      .lean();

    if (!settings) throw new NotFoundException('تنظیمات یافت نشد');

    if (settings.textSections && settings.textSections.length > 0) {
      settings.textSections = settings.textSections.map(
        (section: any) => {
          const { createdAt, updatedAt, ...rest } = section;
          return rest;
        }
      )
    }
    return settings;
  }

  async updateSettings(dto: UpdateSettingsDto) {
    await this.settingsModel.findOneAndUpdate({}, dto, {
      new: true,
      upsert: true,
    }).select('-__v -createdAt -updatedAt');
    return {message: {fa: "تنطیمات با موفقیت تغییر یافت", 
                      en: "Settings changed successfully"}}
  }

  // ---------- Team ----------
  async getTeam() {
    return this.teamModel.find().select('-__v -createdAt -updatedAt').lean();
  }

  async createTeamMember(dto: CreateTeamMemberDto) {
    await this.teamModel.create(dto);
    return {message: {fa: "عضو تیم با موفقیت اضافه شد", 
                      en: "Team member added successfully"}}
  }

  async updateTeamMember(id: string, dto: UpdateTeamMemberDto) {
    const member = await this.teamModel.findByIdAndUpdate(id, dto, { new: true });
    if (!member) throw new NotFoundException('عضو تیم یافت نشد');
    return {message: {fa: "تغییرات با موفقیت اعمال شد", 
                      en: "Changes applied successfully"}}
  }

  async deleteTeamMember(id: string) {
    const member = await this.teamModel.findByIdAndDelete(id);
    if (!member) throw new NotFoundException('عضو تیم یافت نشد');
    return { message: { fa:'عضو تیم حذف شد', 
                        en:'Team member removed'} };
  }

  // ---------- Clients ----------
  async getClients() {
    return this.clientModel.find().select('-__v -createdAt -updatedAt').lean();
  }

  async createClient(dto: CreateClientDto) {
    await this.clientModel.create(dto);
    return {message: {fa: "مشتری با موفقیت اضافه شد", 
                  en: "Customer added successfully"}}
  }

  async updateClient(id: string, dto: UpdateClientDto) {
    const client = await this.clientModel.findByIdAndUpdate(id, dto, { new: true });
    if (!client) throw new NotFoundException('مشتری یافت نشد');
    return {message: {fa: "تغییرات با موفقیت اعمال شد", 
                      en: "Changes applied successfully"}}
  }

  async deleteClient(id: string) {
    const client = await this.clientModel.findByIdAndDelete(id);
    if (!client) throw new NotFoundException('مشتری یافت نشد');
    return { message: { fa:'مشتری حذف شد', 
                    en:'Customer removed'} };
  }

  // ---------- Services ----------
  async getServices() {
    return this.serviceModel.find().select('-__v -createdAt -updatedAt').lean();
  }

  async createService(dto: CreateServiceDto) {
    await this.serviceModel.create(dto);
    return {message: {fa: "خدمت با موفقیت اضافه شد", 
              en: "Service added successfully"}}
  }

  async updateService(id: string, dto: UpdateServiceDto) {
    const service = await this.serviceModel.findByIdAndUpdate(id, dto, { new: true });
    if (!service) throw new NotFoundException('خدمات یافت نشد');
    return {message: {fa: "تغییرات با موفقیت اعمال شد", 
                  en: "Changes applied successfully"}}
  }

  async deleteService(id: string) {
    const service = await this.serviceModel.findByIdAndDelete(id);
    if (!service) throw new NotFoundException('خدمات یافت نشد');
    return { message: { fa:'خدمت حذف شد', 
                en:'Service removed'} };
  }
}