import { Context } from 'telegraf';

export class CommandService {
  start(ctx: Context): void {
    // tslint:disable-next-line:no-console
    ctx.reply('hello from bot').then(r => console.log(r));
  }
}
