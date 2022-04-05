# Discord Bot for linked
This is a bot for the https://github.com/lostdesign/linked discord community: https://discord.gg/uNjJzZvccr.

## Setup
1. Clone repo
```
git clone https://github.com/uselinked/discord.git
```
3. Install dependencies
```
npm i
```
3. Copy `.env.example` to `.env`
4. Create a new bot inside discord developers portal
5. Fill in the necessary fields
6. Start the bot
```
npm run start
```

## Deployment
Initially the bot needs to be installed by hand once, after that follow the steps below.

1. Configure `ecosystem.config.js` as per PM2 docs
2. Update slash commands
```
npm run update:slash-commands
```
3. Deploy to production
```
npm run pm2-deploy
```
