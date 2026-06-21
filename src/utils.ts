export const debounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) => {
  let timer: number;

  return (...args: Parameters<T>) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export class MemoryCache<T> {
  private cache = new Map<string, T>();

  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}

export const formatCurrency = (
  amount: number
): string => {
  return `$${amount.toFixed(2)}`;
};

export const uniqueCategories = (
  categories: string[]
): string[] => {
  return [...new Set(categories)];
};
