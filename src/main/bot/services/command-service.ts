import { Context } from 'telegraf';
import { DatabaseService } from './database-service';

export class CommandService {
  private databaseService: DatabaseService;
  constructor() {
    this.databaseService = new DatabaseService();
  }

  start(ctx: Context): void {
    ctx.reply('hello from bot').then(
      (message) => console.log(message.chat),
      (error) => console.log(error)
    );
  }
}
