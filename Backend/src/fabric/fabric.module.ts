import { Module } from '@nestjs/common';
import { FabricService } from './fabric.service';
import { FabricController } from './fabric.controller';

@Module({
  controllers: [FabricController],
  providers: [FabricService],
})
export class FabricModule {}
