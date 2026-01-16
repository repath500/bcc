import { App } from '@slack/bolt';

// Check if Slack environment variables are set
if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_SIGNING_SECRET || !process.env.SLACK_APP_TOKEN) {
  console.log('Slack bot environment variables not set. Skipping Slack bot startup.');
  process.exit(0);
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.message(async ({ message, say }) => {
  await say(`Inspect Clone bot received: ${(message as { text: string }).text}`);
});

(async () => {
  await app.start();
  console.log('Slack bot running');
})();
