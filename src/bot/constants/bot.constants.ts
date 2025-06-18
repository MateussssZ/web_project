export const BOT_COMMANDS = {
  start: 'start',
};

export const BOT_MESSAGES = {
  welcome: `👋 Welcome to the Articles Bot!\n\nI'll notify you about new articles published on our platform.`,
  newArticle: (notification: { title: string; createdAt: Date; url: string }) => 
    `📢 New Article Published!\n\n` +
    `📖 Title: ${notification.title}\n` +
    `🕒 Published: ${notification.createdAt}\n` +
    `🔗 Read here: ${notification.url}`,
  error: '⚠️ An error occurred. Please try again later.',
};