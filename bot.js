const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: process.env.CLIENT_ID || 'kira-default'
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
        msg.reply('Commands:
!menu - Show this menu
!ping - Pong
!kira - Who made you?
More coming soon...');
    } else if (msg.body === '!ping') {
        msg.reply('Pong!');
    } else if (msg.body === '!kira') {
        msg.reply('Made by Kira ✨');
    }
});
client.initialize();