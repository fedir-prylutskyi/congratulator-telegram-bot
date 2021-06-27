import { Context } from 'telegraf';
import { DatabaseService } from './database-service';
import { red, yellow } from 'chalk';

export class CommandService {
  private databaseService: DatabaseService;
  constructor() {
    this.databaseService = new DatabaseService();
  }

  async start(ctx: Context): Promise<void> {
    try {
      const chat = await ctx.getChat();
      const savedData = await this.databaseService.saveChat(chat);
      console.log(`Successfully saved: ${JSON.stringify(savedData)}`);
      await ctx.reply('💛 Спасибо за подписку! 💛');
    } catch (error) {
      console.log(red(error));
      await ctx.reply(
        'Вы уже подписаны ✅\n\nЕсли хотите отписаться, отправьте команду /cancel 🥺'
      );
    }
  }

  async cancel(ctx: Context): Promise<void> {
    try {
      const chat = await ctx.getChat();
      const deletedData = await this.databaseService.deleteChat(chat);
      if (deletedData) {
        console.log(`Successfully deleted: ${JSON.stringify(deletedData)}`);
        await ctx.reply('Подписка отменена 💔\n\nЧтобы возобновить подписку, отправьте команду /start 😏');
      } else {
        console.log(yellow('Chat already deleted'));
        await ctx.reply('Ваша подписка уже была отменена❗\n\nЧтобы возобновить подписку, отправьте команду /start 😏');
      }
    } catch (error) {
      console.log(red(error));
      await ctx.reply('Упс...что-то пошло не так, пните @f_pril 👊');
    }
  }
}
