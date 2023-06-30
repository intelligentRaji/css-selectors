class EventEmitter<Callback extends (...args: Parameters<Callback>) => void> {
  private events: Record<string, Callback[]> = {};

  public on(event: string, callback: Callback): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  public off(event: string, callback: Callback): void {
    const targetEvent = this.events[event];

    if (!targetEvent) {
      return;
    }

    this.events[event] = targetEvent.filter((item) => item !== callback);

    if (!targetEvent.length) {
      delete this.events[event];
    }
  }

  public emit(event: string, ...args: unknown[]): void {
    const callableEvent = this.events[event];

    if (!callableEvent) {
      return;
    }

    callableEvent.forEach((callback) => {
      callback(...(args as Parameters<Callback>));
    });
  }
}

export const eventEmitter = new EventEmitter();
