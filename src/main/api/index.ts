import express from "express";
const app = express();
import * as dotenv from 'dotenv';
import { green } from "chalk";
import { bot } from '../bot/bot';
dotenv.config();

app.get('/', (req, res) => res.send('Hello World!'));
// Set the bot API endpoint
app.use(bot.webhookCallback('/telegram'));

app.listen(process.env.PORT || 5000, () => {
  console.log(green('App listening on port ' + process.env.PORT || 5000));
});
