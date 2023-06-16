type Callback<T = unknown> = (...args: T[]) => void;

class EventEmitter<T = unknown> {
  private events: Record<string, Callback<T>[]> = {};

  public on(event: string, callback: Callback<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  public off(event: string, callback: Callback<T>): void {
    const targetEvent = this.events[event];

    if (!targetEvent) {
      return;
    }

    targetEvent.filter((item) => item !== callback);

    if (!targetEvent.length) {
      delete this.events[event];
    }
  }

  public emit(event: string, ...args: T[]): void {
    const callableEvent = this.events[event];

    if (!callableEvent) {
      return;
    }

    callableEvent.forEach((callback) => {
      callback(...args);
    });
  }
}

export const eventEmitter = new EventEmitter();
