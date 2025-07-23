# Kira Multi-User WhatsApp Bot

## How to Use

1. Install Node.js
2. Clone this repo or unzip the files
3. Run: `npm install`
4. Rename your session by editing `CLIENT_ID` in the code or set it via terminal: `CLIENT_ID=yourname node bot.js`
5. Run the bot: `node bot.js`
6. Scan the QR code with your WhatsApp
7. Done!

### Optional

To keep it running forever:
```
npm install -g pm2
pm2 start bot.js --name kira-bot
pm2 save
```

### Credits
Made by Kira 🛠️