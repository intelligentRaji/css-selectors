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

interface TestArgs {
  initialValue: number;
  expectedValue: number;
}

const emitParams = [
  [
    {
      initialValue: 1,
      expectedValue: 3,
    },
    {
      initialValue: 1,
      expectedValue: 4,
    },
  ],
  [
    {
      initialValue: 2,
      expectedValue: 6,
    },
    {
      initialValue: 3,
      expectedValue: 6,
    },
  ],
];

/* describe('emit method of eventEmitter', () => {
  let callback: (...args: any[]) => void;

  afterEach(() => {
    eventEmitter.off('test', callback);
  });

  it.each(emitParams)(
    'should handle multiple callbacks for the same event',
    (...args: [TestArgs, TestArgs][]) => {
      args.forEach((param) => {
        let value1 = param[0].initialValue;
        let value2 = initialValue2;
        const callback1 = (multiple: number): void => {
          value1 *= multiple;
        };
        const callback2 = (multiple: number): void => {
          value2 += multiple;
        };
        eventEmitter.on('test', callback1);
        eventEmitter.on('test', callback2);
        eventEmitter.emit('test', 3);
        expect(value1).toBe(expectedValue1);
        expect(value2).toBe(expectedValue2);
      });
    }
  );
}); */
