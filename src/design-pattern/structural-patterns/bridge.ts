interface LogChannel {
  sendLog(msg: string): void;
}

class TelegramChannel implements LogChannel {
  sendLog(msg: string) {
    console.log('[Telegram]', msg);
  }
}
class DiscordChannel implements LogChannel {
  sendLog(msg: string) {
    console.log('[Discord]', msg);
  }
}
class FacebookChannel implements LogChannel {
  sendLog(msg: string) {
    console.log('[Facebook]', msg);
  }
}

class Logger {
  constructor(protected channel: LogChannel) {}
  log(msg: string) {
    this.channel.sendLog(msg);
  }
}

class ErrorLogger extends Logger {
  log(msg: string) {
    super.log('[ERROR] ' + msg);
  }
}
class InfoLogger extends Logger {
  log(msg: string) {
    super.log('[INFO] ' + msg);
  }
}

export function bridgePlayground() {
  const errorLogger = new ErrorLogger(new TelegramChannel());
  errorLogger.log('Out of memory');

  const infoLogger = new InfoLogger(new DiscordChannel());
  infoLogger.log('Server started');

  const plainLogger = new Logger(new FacebookChannel());
  plainLogger.log('User signed in');
}
