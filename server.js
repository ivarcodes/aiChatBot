import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import axios from 'axios';
import {joke} from'./Api/getJoke.js';
import {responseFromGoogleApi} from './Api/responseFromGoogleApi.js';

dotenv.config();

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();



client.on('message', async (message) => {
  const msg = message.body.trim().toLowerCase();

  if (msg === 'hello') {
    message.reply('Hello! How can I assist you today?');
  } else if (msg === 'time') {
    const currentTime = new Date().toLocaleString();
    message.reply(`The current time is: ${currentTime}`);

   
  } 
  else if(msg==="contact"){
      message.reply(" Address: xyz streeet chennai , contact Number :982567810");
  }
  
  else if (msg === 'help') {
    message.reply('Here are the available commands: \n1. hello \n2. time \n3. help \n4. ai [your query] \n5. joke \n 6. contact' );
  } else if (msg.startsWith('ai ')) {
    const query = message.body.slice(3).trim();
    const aiResponse = await responseFromGoogleApi(query);
    message.reply(aiResponse);
  } else if (msg === 'joke') {
    const getjoke = await joke();
    message.reply(getjoke);

  } else {
    message.reply("Sorry, I didn't understand that. Type 'help' to see available commands.");
  }
});
