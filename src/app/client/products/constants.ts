export interface Product {
  id: number;
  name: string;
  value: number;
  hasStock: boolean;
  blocked: boolean;
  custom: boolean;
  imageUrl: string;
  category: ProductCategory;
}

export interface ProductCategory {
  id: number;
  description: string;
}

export interface ProductCreatePayload extends Omit<Product, 'category' | 'id'> {
  categoryId: number;
  ingredientsIds: Array<number>;
}

export interface ProductByCategory {
  productCategory: ProductCategory;
  products: Product[];
}
