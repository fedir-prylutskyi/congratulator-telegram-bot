import { Context } from 'telegraf';
import { DatabaseService } from './database-service';
import { red } from 'chalk';

export class CommandService {
  private databaseService: DatabaseService;
  constructor() {
    this.databaseService = new DatabaseService();
  }

  start(ctx: Context): void {
    ctx.reply('hello from bot').then(
      (message) => console.log(message.chat),
      (error) => console.log(red(error))
    );
  }
}
