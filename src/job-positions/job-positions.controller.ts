import { Controller } from '@nestjs/common';
import { JobPositionsService } from './job-positions.service';

@Controller('job-positions')
export class JobPositionsController {
  constructor(private readonly jobPositionsService: JobPositionsService) {}
}
