import { App } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.message(async ({ message, say }) => {
  await say(`Inspect Clone bot received: ${(message as any).text}`);
});

(async () => {
  await app.start();
  console.log('Slack bot running');
})();
