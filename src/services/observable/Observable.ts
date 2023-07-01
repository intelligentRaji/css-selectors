export function isCallable(fn: unknown): fn is CallableFunction {
  return typeof fn === 'function';
}

export class Observable<ListenerType> {
  private value: ListenerType;

  private listeners: ((params: ListenerType) => void)[];

  constructor(initialValue: ListenerType) {
    this.value = initialValue;
    this.listeners = [];
  }

  public subscribe(listener: (params: ListenerType) => void, updateData = false): void {
    this.listeners.push(listener);
    if (updateData) {
      listener(this.value);
    }
  }

  public unsubscribe(listener: (params: ListenerType) => void): void {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  public notify(params: (previousValue: ListenerType) => ListenerType): void;
  public notify(params: ListenerType): void;
  public notify(
    params:
      | ListenerType
      | (((previousValue: ListenerType) => ListenerType) & CallableFunction)
  ): void {
    if (isCallable(params)) {
      this.value = params(this.value);
    } else {
      this.value = params;
    }

    this.listeners.forEach((listener) => listener(this.value));
  }

  public getValue(): ListenerType {
    return this.value;
  }
}
