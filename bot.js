
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: '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',
    baseURL: 'https://openrouter.ai/api/v1'
});

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kira-default'
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async msg => {
    if (msg.body === '!menu') {
        msg.reply('Commands:\n!menu - Show this menu\n!ping - Pong\n!kira - Who made you?\n!ai [question] - Ask the AI\n!game - Play a guessing game');
    } else if (msg.body === '!ping') {
        msg.reply('Pong!');
    } else if (msg.body === '!kira') {
        msg.reply('Made by Kira ✨');
    } else if (msg.body.startsWith('!ai ')) {
        const prompt = msg.body.slice(4).trim();
        try {
            const response = await openai.chat.completions.create({
                model: 'meta-llama/llama-3-8b-instruct',
                messages: [{ role: 'user', content: prompt }],
            });
            msg.reply(response.choices[0].message.content.trim());
        } catch (err) {
            console.error(err);
            msg.reply('Something went wrong with the AI.');
        }
    } else if (msg.body === '!game') {
        const number = Math.floor(Math.random() * 10) + 1;
        msg.reply(`Guess a number between 1 and 10. Just type the number.`);
        client.once('message', guess => {
            if (parseInt(guess.body) === number) {
                guess.reply('🎉 Correct! You win.');
            } else {
                guess.reply(`Nope! It was ${number}. Try again with !game.`);
            }
        });
    }
});

client.initialize();
