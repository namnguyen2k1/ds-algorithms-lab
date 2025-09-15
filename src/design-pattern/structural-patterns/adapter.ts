interface LoggerAdapter {
  sendLog(message: string): void;
}

class TelegramAPI {
  public sendToChannel(chatId: string, text: string) {
    console.log(`[Telegram] Sent to ${chatId}: ${text}`);
  }
}

class DiscordAPI {
  public postMessage(channelId: string, content: string) {
    console.log(`[Discord] Sent to ${channelId}: ${content}`);
  }
}

class FacebookAPI {
  public pushFeed(pageId: string, message: string) {
    console.log(`[Facebook] Post to page ${pageId}: ${message}`);
  }
}

class TelegramAdapter implements LoggerAdapter {
  constructor(private telegram: TelegramAPI, private chatId: string) {}

  sendLog(message: string): void {
    this.telegram.sendToChannel(this.chatId, message);
  }
}
class DiscordAdapter implements LoggerAdapter {
  constructor(private discord: DiscordAPI, private channelId: string) {}

  sendLog(message: string): void {
    this.discord.postMessage(this.channelId, message);
  }
}
class FacebookAdapter implements LoggerAdapter {
  constructor(private facebook: FacebookAPI, private pageId: string) {}

  sendLog(message: string): void {
    this.facebook.pushFeed(this.pageId, message);
  }
}

export function adapterPlayground() {
  const telegramLogger = new TelegramAdapter(new TelegramAPI(), 'chat-123');
  const discordLogger = new DiscordAdapter(new DiscordAPI(), 'channel-xyz');
  const facebookLogger = new FacebookAdapter(new FacebookAPI(), 'page-001');

  function clientCode(logger: LoggerAdapter) {
    logger.sendLog('System error occurred at 14:00');
  }

  console.log('=== Send log to Telegram ===');
  clientCode(telegramLogger);

  console.log('\n=== Send log to Discord ===');
  clientCode(discordLogger);

  console.log('\n=== Send log to Facebook ===');
  clientCode(facebookLogger);
}
