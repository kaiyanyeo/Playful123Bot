/* Start of bootstrap code */
import 'babel-polyfill';
import bunyan from 'bunyan';
import express from 'express';
import botbuilder from 'botbuilder';
import { Client } from 'recastai';

import config from './config';
import botConnector from './botConnector';

const server = express();
const log = bunyan.createLogger({
  name: 'index.js',
  serializers: bunyan.stdSerializers,
});
/* End of bootstrap code */

const chatBotName = 'Studious Potato';

log.info(`My chatbot: ${chatBotName}`);
log.info(`current environment: ${process.env.NODE_ENV}`);

// Set a connector to bot framework
if (process.env.NODE_ENV === 'production') {
  server.post('/api/messages', botConnector.listen());
}
// Connect botConnector to construct a bot
const bot = new botbuilder.UniversalBot(botConnector.listen());
const recastClient = new Client(config.recastToken);
bot.dialog('/', [
  function (session, args, next) {
    if (!session.userData.name) {
      session.beginDialog('/profile');
    } else {
      next();
    }
  },
  function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        botbuilder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

/* recastClient.textConverse(session.message.text)
    .then((res) => {
      const reply = res.reply()
      session.send(reply);
    })
    .catch((error) => {
      log.error(error);
    });
*/

const port = process.env.PORT || 3000;
server.listen(port, () => {
  log.info(`listening on port ${port}`);
});
