import { Context } from 'telegraf';
import { DatabaseService } from './database-service';
import { red, yellow } from 'chalk';

export class CommandService {
  private databaseService: DatabaseService;
  constructor() {
    this.databaseService = new DatabaseService();
  }

  start(ctx: Context): void {
    ctx
      .getChat()
      .then((chat) => this.databaseService.saveChat(chat))
      .then((chat) => {
        console.log(`Successfully saved: ${JSON.stringify(chat)}`);
        return ctx.reply('💛 Спасибо за подписку! 💛');
      })
      .then()
      .catch((error) => {
        console.log(red(error));
        ctx
          .reply(
            'Вы уже подписаны ✅\n\nЕсли хотите отписаться, отправьте команду /cancel 🥺'
          )
          .then();
      });
  }

  cancel(ctx: Context): void {
    ctx
      .getChat()
      .then((chat) => this.databaseService.deleteChat(chat))
      .then((chat) => {
        if (chat) {
          console.log(`Successfully deleted: ${JSON.stringify(chat)}`);
          ctx
            .reply(
              'Подписка отменена 💔\n\nЧтобы возобновить подписку, отправьте команду /start 😏'
            )
            .then();
        } else {
          console.log(yellow('Chat already deleted'));
          ctx
            .reply(
              'Ваша подписка уже была отменена❗\n\nЧтобы возобновить подписку, отправьте команду /start 😏'
            )
            .then();
        }
      })
      .catch((error) => {
        console.log(red(error));
        ctx.reply('Упс...что-то пошло не так, пните @f_pril 👊').then();
      });
  }
}
