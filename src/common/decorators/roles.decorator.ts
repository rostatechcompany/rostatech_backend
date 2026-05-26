import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '../../admin/schemas/admin.schema';

export const Roles = (...roles: AdminRole[]) => SetMetadata('roles', roles);