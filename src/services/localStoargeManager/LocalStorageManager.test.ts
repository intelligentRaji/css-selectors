import { localStorageManager } from './LocalStorageManager';

const { localStorage } = global;

class LocalStorageMock {
  private store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  public clear(): void {
    this.store = {};
  }

  public getItem(key: string): string | null {
    return this.store[key] || null;
  }

  public setItem(key: string, value: unknown): void {
    this.store[key] = String(value);
  }

  public removeItem(key: string): void {
    delete this.store[key];
  }

  public get length(): number {
    return Object.keys(this.store).length;
  }

  public key(index: number): string {
    return Object.keys(this.store)[index];
  }
}

describe('setItem()', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  afterEach(() => {
    global.localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = localStorage;
  });

  it('store shuold has a key and a value that were passed to the fucntion parameters', () => {
    const key = 'test';
    const value = 5;

    localStorageManager.setItem(key, value);

    expect(localStorageManager.getItem(key)).toBe(value);
  });
});

describe('getItem()', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  afterEach(() => {
    global.localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = localStorage;
  });

  it('if there is no key in localStorage getItem should return defalutValue', () => {
    const key = 'test';
    const defalutValue = 5;

    const result = localStorageManager.getItem(key, defalutValue);

    expect(result).toBe(defalutValue);
  });

  it('should return null if there is no key in localStorage and no defaultValue in getItem parameters', () => {
    const key = 'test';

    const result = localStorageManager.getItem(key);

    expect(result).toBe(null);
  });
});
