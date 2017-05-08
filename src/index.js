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

const chatBotName = 'Playful123Bot';
log.info(`My chatbot: ${chatBotName}`);
log.info(`current environment: ${process.env.NODE_ENV}`);

// in production
if(process.env.NODE_ENV === 'production'){
	server.post('/api/messages', botConnector.listen());
}

// From Microsoft framework
const bot = new botbuilder.UniversalBot(botConnector);
const recastClient = new Client(config.recastToken);

bot.dialog('/', (session) => {
	log.info(`received message: '${session.message.text}'`);
	recastClient.textConverse(session.message.text)
	.then(function(res) {
		const reply = res.reply();
		session.send(reply);
	})
	.catch((error) => {
		log.error(error);
	});
});
	/*[
	function(session, args, next) {
		if(!session.userData.name) {
			// no user data, begin dialog under this path
			session.beginDialog('/profile');
		} else {
			next();
		}
	},
	function(session) {
		// have user data
		session.send(`Hello ${session.userData.name}, I'm ${chatBotName}!`);
	}
]); */

bot.dialog('/profile', [
	function(session) {
		botbuilder.Prompts.text(session, 'Hi! What is your name?');
	},
	function(session, results, next) {
		session.userData.name = results.response;
		session.endDialog();	// to indicate the session has ended
	}
]);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  log.info(`listening on port ${port}`);
});
