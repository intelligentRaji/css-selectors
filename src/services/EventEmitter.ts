type Callback = (...args: any[]) => void;
type Events = Record<string, Callback>;

export class EventEmitter {
  protected events: Events = {};

  public subscribe(key: string, callback: any): void {
    this.events[key] = callback;
  }

  public unsubscribe(key: string): void {
    delete this.events[key];
  }

  public emit(key: string, ...args: any[]): void | any {
    this.events[key](...args);
  }
}
