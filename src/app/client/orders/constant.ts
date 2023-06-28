export interface CreateOrderPayload {
  clientId: number;
  productsList: Array<ProductsOrder>;
}

export interface ProductsOrder {
  productId: number;
  quantity: number;
}
