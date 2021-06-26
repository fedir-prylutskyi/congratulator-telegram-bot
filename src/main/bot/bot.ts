import { Telegraf } from 'Telegraf';
import * as dotenv from 'dotenv';
import { CommandService } from './services/command-service';
import { green } from 'chalk';
dotenv.config();

const bot: Telegraf = new Telegraf(process.env.BOT_TOKEN || '');
const commandService: CommandService = new CommandService();

bot.start(commandService.start);

bot.launch().then(
  () => console.log(green('@balaboba_ua_bot successfully launched')),
  (error) => console.log(error)
);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export { bot };
