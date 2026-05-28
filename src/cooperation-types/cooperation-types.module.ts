import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooperationTypesService } from './cooperation-types.service';
import { CooperationTypesController } from './cooperation-types.controller';
import { CooperationType, CooperationTypeSchema } from './schemas/cooperation-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CooperationType.name, schema: CooperationTypeSchema }])
  ],
  controllers: [CooperationTypesController],
  providers: [CooperationTypesService],
  exports: [CooperationTypesService],
})
export class CooperationTypesModule {}