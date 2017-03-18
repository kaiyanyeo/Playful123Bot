import botbuilder from 'botbuilder';
import { appId, appPassword } from './config';

const isProduction = process.env.NODE_ENV === 'production';
const connector = isProduction ? new botbuilder.ChatConnector({ appId, appPassword }) :
                                 new botbuilder.ConsoleConnector();
export default connector;
