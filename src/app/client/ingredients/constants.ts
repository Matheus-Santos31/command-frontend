export interface Ingredient {
  id: number;
  description: string;
  price: number;
  units: number;
  hasStock: boolean;
}

export interface CreateIngredientPayload {
  description: string;
  price: number;
  units: number;
  hasStock: boolean;
}
