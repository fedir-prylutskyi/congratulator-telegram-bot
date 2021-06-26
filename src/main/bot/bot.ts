import { Telegraf } from 'Telegraf';
import * as dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { CommandService } from "./services/command-service";
dotenv.config();

export class Bot {
  private bot: Telegraf = new Telegraf(process.env.BOT_TOKEN || '');

  constructor(private commandService: CommandService) {
    this.onInit();
  }

  private onInit(): void {
    // this.bot.telegram.setWebhook('http://localhost:5000/telegram')
    //   .then(r => console.log(r),
    //     e => console.log(e));

    this.bot.start(this.commandService.start);

    this.bot.launch()
      .then(() => console.log('@balaboba_ua_bot successfully launched'),
        error => console.log(error));

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  webhookCallback(url: string): RequestHandler {
    return this.bot.webhookCallback(url);
  }
}

const bot = new Bot(CommandService.prototype);
