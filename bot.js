const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Set up WhatsApp
const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 WhatsApp bot is ready!');
});

// ===== AI FUNCTION =====
async function getAIReply(prompt) {
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-r1:free',
                messages: [{ role: 'user', content: prompt }],
            },
            { 
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res.data.choices[0].message.content.trim();
    } catch (err) {
        console.error('AI error:', err.response?.data || err.message);
        return 'OPTIMUS is out of commission, my deepest apologies. Sir Kira will attend to it ASAP!';
    }
}

client.on('message', async message => {
    const text = message.body.toLowerCase();

    if (text === '!menu') {
        message.reply(`📋 *COMMANDS MENU* 📋\n
!menu - Show this menu
!ping - pong
!ai [your question] - Ask anything
!sum [note or text] - Summarize it
!joke - Get a joke
!math [expression] - Solve math
!rps [rock/paper/scissors] - Play
!dice - Roll a dice
!flip - Flip a coin
!fact - Random fact

Made by Kira 🔥`);
    }

    if (text === '!ping') {
        message.reply('pong');
    }

    if (text === '!dice') {
        const roll = Math.floor(Math.random() * 6) + 1;
        message.reply(`🎲 You rolled a ${roll}`);
    }

    if (text === '!flip') {
        const flip = Math.random() > 0.5 ? 'Heads' : 'Tails';
        message.reply(`🪙 ${flip}`);
    }

    if (text === '!fact') {
        const fact = await getAIReply('Tell me a random interesting fact');
        message.reply(fact);
    }

    if (text.startsWith('!ai ')) {
        const query = text.replace('!ai ', '').trim();
        const response = await getAIReply(query);
        message.reply(response);
    }

    if (text.startsWith('!sum ')) {
        const content = text.replace('!sum ', '').trim();
        const response = await getAIReply('Summarize this:\n' + content);
        message.reply(response);
    }

    if (text.startsWith('!joke')) {
        const joke = await getAIReply('Tell me a funny joke');
        message.reply(joke);
    }

    if (text.startsWith('!math ')) {
        const problem = text.replace('!math ', '').trim();
        const solution = await getAIReply(`Solve this math: ${problem}`);
        message.reply(solution);
    }

    if (text.startsWith('!rps ')) {
        const userMove = text.split(' ')[1];
        const moves = ['rock', 'paper', 'scissors'];
        const botMove = moves[Math.floor(Math.random() * moves.length)];
        let result = '';
        if (userMove === botMove) result = "It's a tie!";
        else if (
            (userMove === 'rock' && botMove === 'scissors') ||
            (userMove === 'paper' && botMove === 'rock') ||
            (userMove === 'scissors' && botMove === 'paper')
        ) result = 'You win!';
        else result = 'You lose!';
        message.reply(`You: ${userMove}\nMe: ${botMove}\n${result}`);
    }
});

client.initialize();
