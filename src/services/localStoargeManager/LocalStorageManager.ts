class LocalStorageManager {
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null;
  public getItem<T>(key: string, defaultValue: T): T;
  public getItem<T>(key: string, defaultValue?: T): T | null {
    const savedValue = localStorage.getItem(key);
    return savedValue === null ? defaultValue ?? null : JSON.parse(savedValue);
  }
}

export const localStorageManager = new LocalStorageManager();
