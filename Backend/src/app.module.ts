import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { FabricModule } from './fabric/fabric.module';

@Module({
  imports: [TransactionsModule, UsersModule, FabricModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
