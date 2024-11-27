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
            'https://r6nt2plp-8080.asse.devtunnels.ms/%D0%A0%D0%B5%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%BE%D0%B2.html'
          ),
        ],
      ]),
    });

    const videoPath = path.join(__dirname, './../../../video.mp4');

    // Отправляем видео заметку с явным указанием типа
    await ctx.telegram.sendVideoNote(
      ctx.chat.id,
      {
        source: fs.readFileSync(videoPath),
      } as any // Используем приведение типа
    );
  }
}
