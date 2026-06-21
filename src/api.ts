
import type {
  Product,
  ProductDetail
} from "./types";

import { MemoryCache } from "./utils";

const BASE_URL =
  "https://fakestoreapi.com";

const cache =
  new MemoryCache<unknown>();

export const fetchJson = async <T>(
  url: string
): Promise<T> => {
  try {
    const cached = cache.get(url);

    if (cached) {
      return cached as T;
    }

    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    const data: T =
      await response.json();

    cache.set(url, data);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Unknown error"
    );
  }
};

export const getProducts =
  async (): Promise<Product[]> => {
    return fetchJson<Product[]>(
      `${BASE_URL}/products`
    );
  };

export const getCategories =
  async (): Promise<string[]> => {
    return fetchJson<string[]>(
      `${BASE_URL}/products/categories`
    );
  };

export const getProductById =
  async (
    id: number
  ): Promise<ProductDetail> => {
    return fetchJson<ProductDetail>(
      `${BASE_URL}/products/${id}`
    );
  };

export const loadInitialData =
  async () => {
    const [
      products,
      categories
    ] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    return {
      products,
      categories
    };
  };
