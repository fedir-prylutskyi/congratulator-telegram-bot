import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
// Set the bot API endpoint
// app.use(bot.webhookCallback('/secret-path'));

app.listen(process.env.PORT || 5000, () => {
    // tslint:disable-next-line:no-console
    console.log('App listening on port ' + process.env.PORT || 5000);
});
