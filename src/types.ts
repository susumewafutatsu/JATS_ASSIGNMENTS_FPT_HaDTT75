
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductDetail = Product;

export type ProductCard = Pick<
  Product,
  "id" | "title" | "price" | "image"
>;

export type ProductUpdateDto = Partial<
  Pick<Product, "price">
>;

export type CategoryMap = Record<
  string,
  Product[]
>;

export type LoadingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };
