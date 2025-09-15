// Event type
interface Event {
  type: string;
  payload?: any;
}

// Handler interface
interface EventHandler {
  setNext(handler: EventHandler): EventHandler;
  handle(event: Event): void;
}

// Base handler
abstract class BaseEventHandler implements EventHandler {
  private nextHandler?: EventHandler;

  setNext(handler: EventHandler): EventHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(event: Event): void {
    if (this.nextHandler) {
      this.nextHandler.handle(event);
      return;
    }

    console.log(`Can not handle ${event.type} event`);
  }
}

// Concrete handlers
class ClickEventHandler extends BaseEventHandler {
  handle(event: Event): void {
    if (event.type === 'click') {
      console.log(`ClickEventHandler: Handling click event with data:`, event.payload);
    } else {
      super.handle(event);
    }
  }
}

class HoverEventHandler extends BaseEventHandler {
  handle(event: Event): void {
    if (event.type === 'hover') {
      console.log(`HoverEventHandler: Handling hover event with data:`, event.payload);
    } else {
      super.handle(event);
    }
  }
}

class KeyboardEventHandler extends BaseEventHandler {
  handle(event: Event): void {
    if (event.type === 'keyboard') {
      console.log(`KeyboardEventHandler: Handling keyboard event with data:`, event.payload);
    } else {
      super.handle(event);
    }
  }
}

export function chainOfResponsibilityPlayground() {
  const clickHandler = new ClickEventHandler();
  const hoverHandler = new HoverEventHandler();
  const keyboardHandler = new KeyboardEventHandler();

  // Create chain: click -> hover -> keyboard
  clickHandler.setNext(hoverHandler).setNext(keyboardHandler);

  const events: Event[] = [
    { type: 'click', payload: { x: 100, y: 200 } },
    { type: 'hover', payload: { element: 'button' } },
    { type: 'keyboard', payload: { key: 'Enter' } },
    { type: 'scroll', payload: { top: 300 } }
  ];

  for (const event of events) {
    console.log(`\nClient: Dispatching event ${event.type}`);
    clickHandler.handle(event);
  }
}
