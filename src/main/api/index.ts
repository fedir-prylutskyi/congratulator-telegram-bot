import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import { Bot } from '../bot/bot';
import { CommandService } from "../bot/services/command-service";
dotenv.config();

app.get('/', (req, res) => res.send('Hello World!'));
// Set the bot API endpoint
app.use(new Bot(CommandService.prototype).webhookCallback('/telegram'));

app.listen(process.env.PORT || 5000, () => {
    console.log('App listening on port ' + process.env.PORT || 5000);
});
