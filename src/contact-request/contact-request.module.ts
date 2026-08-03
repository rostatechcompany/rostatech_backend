import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactRequest, ContactRequestSchema } from './schemas/contact-request.schema';
import { ContactRequestService } from './contact-request.service';
import { ContactRequestController } from './contact-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactRequest.name, schema: ContactRequestSchema },
    ]),
  ],
  controllers: [ContactRequestController],
  providers: [ContactRequestService],
  exports: [ContactRequestService],
})
export class ContactRequestModule {}