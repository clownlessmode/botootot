import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramModule } from 'src/common/providers/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [],
  providers: [BotService],
})
export class BotModule {}
