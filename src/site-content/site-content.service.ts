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
import { UploadService } from '../upload/upload.service';

@Injectable()
export class SiteContentService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
    @InjectModel(TeamMember.name) private teamModel: Model<TeamMemberDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    
    private uploadService: UploadService,
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
    // current settings
    const current = await this.settingsModel.findOne();
    if (!current) {
      const created = await this.settingsModel.create(dto);
      return { message: { fa: 'تنظیمات ایجاد شد', en: 'Settings created successfully' } };
    }

    // delete old image of textSections
    if (dto.textSections !== undefined) {
      const oldSections = current.textSections ?? [];
      const newSectionsMap = new Map(dto.textSections.map(s => [s.key, s]));

      for (const oldSection of oldSections) {
        const oldImage = oldSection.image;
        if (!oldImage) continue;

        const newSection = newSectionsMap.get(oldSection.key);
        if (!newSection) {
          // if all section deleted, its image would too..
          try {
            await this.uploadService.deleteImage(oldImage);
          } catch (e) { console.error('خطا در حذف تصویر حذف‌شده:', e); }
        } else if (newSection.image !== oldImage) {
          try {
            await this.uploadService.deleteImage(oldImage);
          } catch (e) { console.error('خطا در حذف تصویر قدیمی:', e); }
        }
      }
    }

    // update doc
    await this.settingsModel.findOneAndUpdate({}, dto, {
      new: true,
      upsert: true,
    }).select('-__v -createdAt -updatedAt');

    return {
      message: {
        fa: 'تنظیمات با موفقیت تغییر یافت',
        en: 'Settings changed successfully',
      },
    };
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
    const member = await this.teamModel.findById(id);
    if (!member) throw new NotFoundException('عضو تیم یافت نشد');

    if (dto.photoUrl !== undefined && dto.photoUrl !== member.photoUrl) {
      if (member.photoUrl) {
        try {
          await this.uploadService.deleteImage(member.photoUrl);
        } catch (error) {
          console.error('خطا در حذف عکس قدیمی عضو تیم:', error);
        }
      }
    }

    // update fields
    Object.assign(member, dto);
    await member.save();

    return {
      message: {
        fa: 'تغییرات با موفقیت اعمال شد',
        en: 'Changes applied successfully'
      }
    };
  }

  async deleteTeamMember(id: string) {
    const member = await this.teamModel.findById(id);
    if (!member) throw new NotFoundException('عضو تیم یافت نشد');

    // delete image
    if (member.photoUrl) {
      try {
        await this.uploadService.deleteImage(member.photoUrl);
      } catch (error) {
        console.error('خطا در حذف فایل عضو تیم:', error);
      }
    }

    await this.teamModel.findByIdAndDelete(id);
    return {
      message: {
        fa: 'عضو تیم حذف شد',
        en: 'Team member removed'
      }
    };
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
    const client = await this.clientModel.findById(id);
    if (!client) throw new NotFoundException('مشتری یافت نشد');

    if (dto.logoUrl !== undefined && dto.logoUrl !== client.logoUrl) {
      if (client.logoUrl) {
        try {
          await this.uploadService.deleteImage(client.logoUrl);
        } catch (error) {
          console.error('خطا در حذف لوگوی قدیمی مشتری:', error);
        }
      }
    }

    Object.assign(client, dto);
    await client.save();

    return {
      message: {
        fa: 'تغییرات با موفقیت اعمال شد',
        en: 'Changes applied successfully',
      },
    };
  }

  async deleteClient(id: string) {
    const client = await this.clientModel.findById(id);
    if (!client) throw new NotFoundException('مشتری یافت نشد');

    // delete image
    if (client.logoUrl) {
      try {
        await this.uploadService.deleteImage(client.logoUrl);
      } catch (error) {
        console.error('خطا در حذف لوگوی مشتری:', error);
      }
    }

    await this.clientModel.findByIdAndDelete(id);
    return {
      message: {
        fa: 'مشتری حذف شد',
        en: 'Customer removed',
      },
    };
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
    const service = await this.serviceModel.findById(id);
    if (!service) throw new NotFoundException('خدمات یافت نشد');

    if (dto.imageUrl !== undefined && dto.imageUrl !== service.imageUrl) {
      if (service.imageUrl) {
        try {
          await this.uploadService.deleteImage(service.imageUrl);
        } catch (error) {
          console.error('خطا در حذف تصویر قدیمی خدمات:', error);
        }
      }
    }

    Object.assign(service, dto);
    await service.save();

    return {
      message: {
        fa: 'تغییرات با موفقیت اعمال شد',
        en: 'Changes applied successfully',
      },
    };
  }

  async deleteService(id: string) {
    const service = await this.serviceModel.findById(id);
    if (!service) throw new NotFoundException('خدمات یافت نشد');

    // delete image
    if (service.imageUrl) {
      try {
        await this.uploadService.deleteImage(service.imageUrl);
      } catch (error) {
        console.error('خطا در حذف تصویر خدمات:', error);
      }
    }

    await this.serviceModel.findByIdAndDelete(id);
    return {
      message: {
        fa: 'خدمت حذف شد',
        en: 'Service removed',
      },
    };
  }
}