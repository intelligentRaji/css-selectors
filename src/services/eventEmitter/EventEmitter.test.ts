import { eventEmitter } from './EventEmitter';

describe('eventEmitter', () => {
  let callback: (...args: any[]) => void;

  afterEach(() => {
    eventEmitter.off('test', callback);
  });

  it('creates an event if there is no event in event object and adds the callback to event array', () => {
    const emitterStatus = {
      isCalled: false,
    };
    callback = (): void => {
      emitterStatus.isCalled = true;
    };
    eventEmitter.on('test', callback);
    eventEmitter.emit('test');
    expect(emitterStatus.isCalled).toBeTruthy();
  });

  it('removes the callback from event array', () => {
    let isCalled = false;
    callback = (): void => {
      isCalled = true;
    };
    eventEmitter.on('test', callback);
    eventEmitter.off('test', callback);
    eventEmitter.emit('test');
    expect(isCalled).toBeFalsy();
  });
});
