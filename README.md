# Kira Multi-User WhatsApp Bot

A simple WhatsApp bot that saves sessions, responds to commands, and connects to a free AI (LLaMA) for smart replies.

## 🛠 How to Use

1. Make sure you have Node.js installed
2. Clone this repo or unzip the files
3. Open terminal in the folder
4. Run:
   ```bash
   npm install
5. To rename your session (optional), change CLIENT_ID in bot.js
   or run like this:
   CLIENT_ID=yourname node bot.js
6. Start the bot:
   node bot.js
7. Scan the QR code with WhatsApp
8. Done


🤖 Commands
!menu – List all available commands

!ping – Replies “Pong!”

!kira – Says who made the bot

!ai [message] – Ask anything. Study help, summaries, advice, fun questions, etc.

More coming soon...



📌 Notes
Each person can host their own copy. Once QR is scanned, session saves.

No .env needed unless you want to change the API key.

The default API uses OpenRouter’s free LLaMA model.



📡 Keep It Running Forever
npm install -g pm2
pm2 start bot.js --name kira-bot
pm2 save




🔑 Optional: Use Your Own AI Key
1. Add .env file with:
OPENROUTER_API_KEY=your-api-key

2. Update bot.js to read:
require('dotenv').config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;



🧠 Built-in AI Assistant
1. Uses DeepSeek R1 through OpenRouter API
2. No signup needed
3. Gives ChatGPT-style responses
4. Good for research, summaries, ideas, answers, etc.



👤 Credits
Made by Kira 🛠️

