interface Messenger {
  sendMessage(msg: string): void;
}

class TelegramService implements Messenger {
  sendMessage(msg: string): void {
    console.log(`[Telegram] Sent: ${msg}`);
  }
}

class LoggingProxy implements Messenger {
  constructor(private realService: TelegramService) {}

  sendMessage(msg: string): void {
    if (this.checkAccess()) {
      this.realService.sendMessage(msg);
      this.logMessage(msg);
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking permissions before sending...');
    return true;
  }

  private logMessage(msg: string): void {
    console.log(`[ProxyLog] Message sent at ${new Date().toISOString()}: "${msg}"`);
  }
}

export function proxyPlayground() {
  function clientCode(messenger: Messenger) {
    messenger.sendMessage('Hello from client!');
  }

  console.log('=== Without Proxy ===');
  const realService = new TelegramService();
  clientCode(realService);

  console.log('\n=== With Proxy ===');
  const proxy = new LoggingProxy(realService);
  clientCode(proxy);
}
