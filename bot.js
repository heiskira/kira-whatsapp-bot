// bot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'kira-default' })
});

const API_KEY = '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';

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async msg => {
  const content = msg.body.trim();

  if (content === '!menu') {
    msg.reply(`Commands:
!menu - Show this menu
!ping - Pong
!kira - Who made you?
!ask [your question] - AI Assistant
More coming soon...`);
  } else if (content === '!ping') {
    msg.reply('Pong!');
  } else if (content === '!kira') {
    msg.reply('Made by Kira ✨');
  } else if (content.startsWith('!ask')) {
    const userInput = content.slice(4).trim();
    if (!userInput) return msg.reply('You need to ask something like `!ask What is cyber security?`');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct:nitro',
          messages: [
            { role: 'system', content: 'You are a helpful AI study assistant that gives detailed answers.' },
            { role: 'user', content: userInput }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'No response from LLaMA.';
      msg.reply(reply);
    } catch (err) {
      console.error(err);
      msg.reply('Failed to get response from AI.');
    }
  }
});

client.initialize();
