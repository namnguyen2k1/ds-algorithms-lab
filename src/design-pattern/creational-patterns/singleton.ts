class Logger {
  static #instance: Logger;

  private constructor() {}

  public static get instance(): Logger {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }

    return Logger.#instance;
  }
}

export function singletonPlayground() {
  const s1 = Logger.instance;
  const s2 = Logger.instance;

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}
