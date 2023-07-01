import { Observable } from './Observable';

// eslint-disable-next-line max-lines-per-function
describe('notify()', () => {
  let observable: Observable<number>;

  beforeEach(() => {
    const value = 5;
    observable = new Observable(value);
  });

  it('listener should be called with observable value changed after notify', () => {
    const listener = jest.fn();

    observable.subscribe(listener);
    expect(listener).toBeCalledTimes(0);

    const param = 15;
    observable.notify(param);

    expect(observable.getValue()).toBe(15);
    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(15);
  });

  it('notify can take callbacks as paramenters', () => {
    const listener = jest.fn();

    observable.subscribe(listener);
    expect(listener).toBeCalledTimes(0);

    const param = (value: number): number => value + 1;
    observable.notify(param);

    expect(observable.getValue()).toBe(6);
    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(6);
  });
});

describe('subscribe()', () => {
  it('listener should subscirbe and immediately to be called', () => {
    const value = 5;
    const observable = new Observable(value);
    const listener = jest.fn();

    observable.subscribe(listener, true);

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(5);
  });
});

describe('unsubscribe()', () => {
  it('listener should not be called', () => {
    const value = 5;
    const observable = new Observable(value);
    const listener = jest.fn();

    observable.subscribe(listener);
    observable.unsubscribe(listener);

    expect(listener).toBeCalledTimes(0);
  });
});
