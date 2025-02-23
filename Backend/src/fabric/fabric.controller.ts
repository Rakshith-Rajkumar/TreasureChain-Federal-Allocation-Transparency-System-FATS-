import { Controller } from '@nestjs/common';
import { FabricService } from './fabric.service';

@Controller('fabric')
export class FabricController {
  constructor(private readonly fabricService: FabricService) {}
}
