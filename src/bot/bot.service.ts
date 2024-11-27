import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import * as fs from 'fs';
import * as path from 'path';

@Update()
@Injectable()
export class BotService {
  constructor() {}

  @Start()
  private async startBot(@Ctx() ctx: Context) {
    const WelcomingMessage = `
*Этого бота мы создали для вашего удобства и безопасности\\.* Здесь вы можете быстро получить личную консультацию от меня\\.

*Используя этого бота\\, вы сможете\\:*
\— Задать любые вопросы по вашим финансовым обязательствам
\— Получить оперативные ответы и рекомендации
\— Записаться на консультацию
\— Следить за обновлениям и новыми предложениями
  `;

    await ctx.reply(WelcomingMessage, {
      parse_mode: 'MarkdownV2',
      ...Markup.inlineKeyboard([
        [
          Markup.button.webApp(
            'Открыть визитку 🌐',
            'https://khal-web-app.vercel.app/'
          ),
        ],
      ]),
    });

    const videoPath = path.join(__dirname, './../../video.mp4');

    // Отправляем видео заметку с явным указанием типа
    await ctx.telegram.sendVideoNote(
      ctx.chat.id,
      {
        source: fs.readFileSync(videoPath),
      } as any // Используем приведение типа
    );
  }
}
