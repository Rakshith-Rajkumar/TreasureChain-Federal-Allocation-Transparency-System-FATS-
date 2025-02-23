import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { FabricService } from '../fabric/fabric.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, FabricService],
})
export class TransactionsModule {}